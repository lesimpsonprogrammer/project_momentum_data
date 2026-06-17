(() => {
  const form = document.querySelector('#createWorkflowForm');
  const conditionList = document.querySelector('#workflowConditionList');
  const addConditionButton = document.querySelector('#addWorkflowCondition');
  const confirmation = document.querySelector('#workflowSaveConfirmation');
  const activeKey = 'cpsmActiveWorkflows';

  if (!form || !conditionList) return;

  function getActiveWorkflows() {
    try {
      return JSON.parse(localStorage.getItem(activeKey) || '[]');
    } catch (error) {
      localStorage.removeItem(activeKey);
      return [];
    }
  }

  function saveActiveWorkflows(workflows) {
    localStorage.setItem(activeKey, JSON.stringify(workflows));
  }

  function createConditionRow() {
    const firstRow = conditionList.querySelector('.workflow-condition-row');
    const nextRow = firstRow.cloneNode(true);
    nextRow.querySelectorAll('select, input').forEach((field) => {
      field.value = '';
    });
    conditionList.appendChild(nextRow);
  }

  function collectConditions() {
    return Array.from(conditionList.querySelectorAll('.workflow-condition-row')).map((row) => ({
      field: row.querySelector('[name="fieldOption"]')?.value || '',
      condition: row.querySelector('[name="fieldCondition"]')?.value || '',
      value: row.querySelector('[name="fieldValue"]')?.value || '',
      action: row.querySelector('[name="actionOption"]')?.value || '',
    })).filter((rule) => rule.field && rule.condition && rule.action);
  }

  function renderConfirmation(workflow) {
    if (!confirmation) return;
    const summaryItems = workflow.conditions.map((rule, index) => `<li><strong>Rule ${index + 1}:</strong> IF ${rule.field} ${rule.condition} ${rule.value || '(blank)'} THEN ${rule.action}</li>`).join('');
    confirmation.hidden = false;
    confirmation.innerHTML = `<strong>Workflow saved successfully.</strong><p>${workflow.name} is now active and available in Workflow Dashboard.</p><ul>${summaryItems}</ul>`;
  }

  addConditionButton?.addEventListener('click', createConditionRow);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const workflow = {
      id: `wf-${Date.now()}`,
      name: data.get('workflowName') || 'Untitled Workflow',
      description: data.get('workflowDescription') || '',
      status: 'Active',
      createdAt: new Date().toISOString(),
      conditions: collectConditions(),
    };

    const workflows = getActiveWorkflows();
    workflows.unshift(workflow);
    saveActiveWorkflows(workflows);
    renderConfirmation(workflow);
    form.reset();
    conditionList.querySelectorAll('.workflow-condition-row').forEach((row, index) => {
      if (index > 0) row.remove();
    });
  });
})();
