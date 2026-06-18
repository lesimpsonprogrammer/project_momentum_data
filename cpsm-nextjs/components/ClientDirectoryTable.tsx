'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { clientDashboardPath, sampleClients } from '../lib/clients';

export function ClientDirectoryTable() {
  const [query, setQuery] = useState('');
  const filteredClients = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return sampleClients;
    return sampleClients.filter((client) =>
      [client.id, client.name, client.status, client.team].some((value) => value.toLowerCase().includes(normalized)),
    );
  }, [query]);

  return (
    <>
      <form className="portal-google-search client-directory-search" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="clientDirectorySearch">
          Search clients
        </label>
        <input
          id="clientDirectorySearch"
          name="clientDirectorySearch"
          type="search"
          placeholder="Search Client ID or Client Name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="btn primary" type="submit">
          Search
        </button>
      </form>
      <section className="directory-results-panel directory-results-top" aria-labelledby="directoryResultsTitle">
        <div className="directory-results-heading">
          <p className="tile-kicker">Directory Results</p>
          <h2 id="directoryResultsTitle">Search Results</h2>
        </div>
        <div className="directory-result-header" aria-hidden="true">
          <span>Client ID</span>
          <span>Client Name</span>
          <span>Status</span>
          <span>Team</span>
          <span>Dashboard</span>
        </div>
        <div className="directory-result-list">
          {filteredClients.map((client) => (
            <div className="directory-result-row" key={client.id}>
              <Link href={clientDashboardPath(client.id)}>{client.id}</Link>
              <span>{client.name}</span>
              <span>{client.status}</span>
              <span>{client.team}</span>
              <Link href={clientDashboardPath(client.id)}>Open</Link>
            </div>
          ))}
        </div>
        {!filteredClients.length && <p className="directory-empty-state">No matching clients found.</p>}
      </section>
    </>
  );
}
