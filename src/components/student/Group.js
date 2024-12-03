import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import GroupChat from "./GroupChat";

const Group = () => {
  const { groupId, groupName, name } = useParams();
  console.log(groupName, groupId);
  const {
    data: members,
    membersIsLoading,
    membersIsError,
    status,
  } = useCustomQuery(
    ["members", groupId],
    `https://lms-api-xi.vercel.app/groups/${groupId}/members`
  );
  console.log(members, status);
  if (membersIsLoading) return <div>Loading memebers data...</div>;
  if (membersIsError) return <div>Error loading members data</div>;
  return (
    <div>
      <div className="sticky top-10 bg-lp-blue border-1 h-10 py-2 pl-5 flex start-0 gap-4 text-ds-blue">
        <span className="font-bold">{name}</span>
        {members && <span className="font-bold">{members.length} Members</span>}
      </div>
      <GroupChat groupId={groupId} groupName={groupName} />
    </div>
  );
};
export default Group;
