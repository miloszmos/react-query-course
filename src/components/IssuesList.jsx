import React from 'react';
import { useQuery } from 'react-query';
import { IssueItem } from './IssueItem';

export default function IssuesList({ labels }) {
  const { isLoading, data } = useQuery(
    [
      'issues',
      {
        labels,
      },
    ],
    async () => {
      const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
      const res = await fetch(`/api/issues?${labelsString}`);
      return await res.json();
    }
  );

  return (
    <div>
      <h2>Issues List</h2>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul className="issues-list">
          {data.map((issue) => (
            <IssueItem
              key={issue.id}
              title={issue.title}
              number={issue.number}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              labels={issue.labels}
              status={issue.status}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
