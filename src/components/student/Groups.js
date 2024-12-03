import { Link } from "react-router-dom";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { useStudent } from "../../hooks/useStudent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const Groups = () => {
  const { studentDetail } = useStudent();
  const [message, setMessage] = useState("");
  const [showCreategroup, setShowCreateGroup] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const queryClient = useQueryClient();
  const {
    data: groups_in,
    isLoading: inIsLoading,
    isError: inIsError,
  } = useCustomQuery(
    ["groups_in"],
    `https://lms-api-xi.vercel.app/students/${studentDetail.id}/groups?status=member`
  );
  const {
    data: groups_not_in,
    isLoading: notIsLoading,
    isError: notIsError,
  } = useCustomQuery(
    ["groups_not_in"],
    `https://lms-api-xi.vercel.app/students/${studentDetail.id}/groups?status=non-member`
  );

  const joinMutation = useMutation({
    mutationFn: async (groupId) => {
      console.log(groupId);
      const response = await fetch(
        `https://lms-api-xi.vercel.app/groups/${groupId}/${studentDetail.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: "",
        }
      );

      if (!response.ok) {
        // if (response.status === 400) {
        //   throw new Error('Applicant email already exist');
        // }
        throw new Error("Error joining group");
      }

      return response.json();
    },
    onError: (error) => {
      setMessage(error.message);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["groups_in", "groups_not_in"]);
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newGroupData) => {
      const response = await fetch(`https://lms-api-xi.vercel.app/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGroupData),
      });

      if (!response.ok) {
        // if (response.status === 400) {
        //   throw new Error('Applicant email already exist');
        // }
        throw new Error("Error joining group");
      }

      return response.json();
    },
    onSuccess: () => {
      setShowCreateGroup((prev) => !prev);
      setName("");
      setDesc("");
      queryClient.refetchQueries(["groups_in", "groups_not_in"]);
    },
    onError: (error) => {
      setMessage(error.message);
    },
  });

  const handleJoin = (groupId) => {
    console.log(groupId);
    joinMutation.mutate(groupId);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();

    const newGroupData = {
      name,
      desc,
      creator: studentDetail.id,
    };
    createMutation.mutate(newGroupData);
  };

  if (inIsLoading || notIsLoading)
    return <div className="text-white">Loading groups data...</div>;
  if (inIsError || notIsError)
    return <div className="text-red-500">Error loading groups data...</div>;

  return (
    <div className="bg-[#0F2942] min-h-screen p-6">
      <div className="sticky top-10 flex start-5">
        <button
          onClick={() => setShowCreateGroup((prev) => !prev)}
          className="bg-white w-60 text-center py-3"
        >
          Create New Study Group
        </button>
      </div>
      <div className="grid grid-cols-2 gap-10 mt-10">
        {/* Groups you are in */}
        <div className="space-y-4  ">
          <p className="text-2xl text-[#3498DB]">Groups you are in</p>
          {groups_in.map((group) => (
            <Link
              to={`/student/group/${group.id}/${group.group_name}/${group.name}`}
              key={group.id}
              className="block bg-[#176FB2] hover:bg-[#3498DB] text-white px-4 py-2 rounded-md transition-colors"
            >
              <span className="font-bold">{group.name}</span>
              <span className="block text-sm text-[#C1DFF6]">
                Created by:{" "}
                {group.creator_details.id === studentDetail.id
                  ? "You"
                  : group.creator_details.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Groups you are not in */}
        <div className="space-y-4  ">
          <p className="text-2xl text-[#3498DB]">Groups you are not in</p>
          {groups_not_in.map((group) => (
            <div
              key={group.id}
              className="flex justify-between items-center bg-[#1D1D1F] text-white px-4 py-2 rounded-md"
            >
              <div>
                <span className="font-bold">{group.name}</span>
                <span className="block text-sm text-[#666A6D]">
                  Created by: {group.creator_details.name}
                </span>
              </div>
              <button
                className="bg-[#176FB2] hover:bg-[#3498DB] text-white px-3 py-1 rounded-md transition-colors"
                onClick={() => handleJoin(group.id)}
              >
                Join Group
              </button>
              {message && <p>{message}</p>}
            </div>
          ))}
        </div>
      </div>
      {showCreategroup && (
        <div>
          <div>
            <button onClick={() => setShowCreateGroup((prev) => !prev)}>
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateGroup}>
            <input
              type="text"
              placeholder="Group name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Groups;
