const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <h1>User Details</h1>
      <div>Displaying details of user {id}</div>
    </div>
  );
};

export default UserDetails;
