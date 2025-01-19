import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetGroupsQuery } from "./groupsApiSlice";

const GroupsList = () => {
  const { user_id: studentId } = useAuth();
  const { groups = [], isLoading, isSuccess, isError, error } = useGetGroupsQuery(studentId, {
    selectFromResult: (result) => ({
      groups: Object.values(result?.data?.entities || {}).map((group) => ({
        id: group.id,
        name: group.name,
        creator: group.creator,
        is_member: group.is_member, 
        is_creator: group.is_creator
      })),
      ...result
    }),
  });

  console.log('====================================');
  console.log(groups);
  console.log('====================================');

  const [filterValue, setFilterValue] = useState("");

  // Filter groups based on the is_member field
  const filteredGroups = groups.filter((group) =>
    filterValue
      ? filterValue === "member"
        ? group.is_member
        : !group.is_member
      : true
  );

  const memberGroups = filteredGroups.filter((group) => group.is_member);
  const nonMemberGroups = filteredGroups.filter((group) => !group.is_member);

  let content;
  if (isLoading) {
    content = <p className="text-center text-gray-500">Loading...</p>;
  } else if (isError) {
    content = <p className="text-center text-red-500">{error?.data?.message}</p>;
  } else if (isSuccess) {
    content = (
      <div className="space-y-6">
        {/* Filter dropdown and Create Group link */}
        <div className="flex justify-between items-center">
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Groups</option>
            <option value="member">Groups I'm a Member</option>
            <option value="non-member">Groups I'm Not a Member</option>
          </select>
          <Link
            to="new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Group
          </Link>
        </div>

        {/* Display groups or fallback message */}
        {filteredGroups.length === 0 ? (
          <p className="text-gray-500 text-center">No groups found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Groups where student is a member */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Groups I'm a Member</h3>
              {memberGroups.length > 0 ? (
                <ul className="space-y-4">
                  {memberGroups.map((group) => (
                    <li
                      key={group.id}
                      className="border border-gray-300 rounded-lg p-4 shadow-md"
                    >
                      <h4 className="text-lg font-medium">{group.name}</h4>
                      <p className="text-gray-500 text-sm">Creator: {group.creator_name}</p>
                      <p className="text-green-600 text-sm">
                        You are a member of this group
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No groups found where you're a member.
                </p>
              )}
            </div>

            {/* Groups where student is not a member */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Groups I'm Not a Member</h3>
              {nonMemberGroups.length > 0 ? (
                <ul className="space-y-4">
                  {nonMemberGroups.map((group) => (
                    <li
                      key={group.id}
                      className="border border-gray-300 rounded-lg p-4 shadow-md"
                    >
                      <h4 className="text-lg font-medium">{group.name}</h4>
                      <p className="text-gray-500 text-sm">Creator: {group.creator_name}</p>
                      <button className="bg-blue-600 text-white px-3 py-2 rounded mt-2 hover:bg-blue-700">
                        Join Group
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No groups found where you're not a member.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Study Groups</h1>
      {content}
    </div>
  );
};

export default GroupsList;
