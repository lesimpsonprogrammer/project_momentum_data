'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ClientRecord, clientDashboardPath, sampleClients } from '../lib/clients';

const scopeKey = 'cpsmActiveClientScope';

export function ScopeSelector() {
  const [query, setQuery] = useState('');
  const [activeScope, setActiveScope] = useState<ClientRecord | null>(null);

  useEffect(() => {
    const storedScope = window.localStorage.getItem(scopeKey);
    if (storedScope) setActiveScope(JSON.parse(storedScope));
  }, []);

  const filteredClients = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return sampleClients;
    return sampleClients.filter((client) =>
      [client.id, client.name, client.status, client.team].some((value) => value.toLowerCase().includes(normalized)),
    );
  }, [query]);

  function setScope(client: ClientRecord) {
    window.localStorage.setItem(scopeKey, JSON.stringify(client));
    setActiveScope(client);
  }

  function clearScope() {
    window.localStorage.removeItem(scopeKey);
    setActiveScope(null);
  }

  return (
    <>
      <form className="portal-google-search client-directory-search" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="scopeSearch">
          Search client scope
        </label>
        <input
          id="scopeSearch"
          name="scopeSearch"
          type="search"
          placeholder="Search Client ID or Client Name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="btn primary" type="submit">
          Search
        </button>
        <Link href="/client-directory">Open Client Directory</Link>
      </form>
      <section className="directory-results-panel directory-results-top" aria-labelledby="scopeResultsTitle">
        <div className="directory-results-heading">
          <p className="tile-kicker">Client Scope Results</p>
          <h2 id="scopeResultsTitle">Select Client Scope</h2>
        </div>
        <div className="directory-result-header scope-result-header" aria-hidden="true">
          <span>Client ID</span>
          <span>Client Name</span>
          <span>Status</span>
          <span>Team</span>
          <span>Scope</span>
        </div>
        <div className="directory-result-list">
          {filteredClients.map((client) => (
            <div className="directory-result-row scope-result-row" key={client.id}>
              <Link href={clientDashboardPath(client.id)} onClick={() => setScope(client)}>
                {client.id}
              </Link>
              <span>{client.name}</span>
              <span>{client.status}</span>
              <span>{client.team}</span>
              <button className="scope-select-button" type="button" onClick={() => setScope(client)}>
                Set Scope
              </button>
            </div>
          ))}
        </div>
        {!filteredClients.length && <p className="directory-empty-state">No matching clients found.</p>}
      </section>
      <section className="scope-active-card" aria-live="polite">
        <p className="tile-kicker">Active Scope</p>
        <h2>{activeScope ? `${activeScope.id} — ${activeScope.name}` : 'No client scope selected'}</h2>
        <p>
          {activeScope
            ? `Active client scope: ${activeScope.status} · ${activeScope.team}. CPSM views should now filter around this client context.`
            : 'Once a client is selected, CPSM will use that client as the active viewing scope for this browser session.'}
        </p>
        <div className="scope-action-row">
          <Link className="btn secondary" href={activeScope ? clientDashboardPath(activeScope.id) : '/client-portal'}>
            Open Dashboard
          </Link>
          <button className="btn secondary" type="button" onClick={clearScope}>
            Clear Scope
          </button>
        </div>
      </section>
    </>
  );
}
