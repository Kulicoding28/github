import { UserQuery, githubAPI } from "@/api/api";
import { UserModel } from "@/models/userModel";
import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Input, VStack, Button, Accordion } from "@chakra-ui/react";
import UserRepository from "../user-repository/UserRepository";

const UserSearch: FC = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<Array<UserModel>>([]);

  const query: UserQuery = {
    q: search,
    per_page: 5,
    page: 1,
  };

  const { data: userRes } = useQuery({
    queryKey: ["users", search],
    queryFn: () => githubAPI.getUser(query),
    enabled: search !== "",
  });

  const fetchUsers = () => {
    setSearch(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchUsers();
    }
  };

  useEffect(() => {
    if (userRes) {
      setUsers(userRes.items);
    }
  }, [userRes]);

  return (
    <div>
      <VStack>
        <Box>
          <Input
            variant="filled"
            size="md"
            w="auto"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search users"
          />
          <Box gap="6px" mt="4">
            <Button bg="blue.300" w="auto" onClick={() => fetchUsers()}>
              Search
            </Button>
          </Box>
        </Box>
        <Accordion gap="1.5rem">
          {users.map((user) => (
            <UserRepository user={user} />
          ))}
        </Accordion>
      </VStack>
    </div>
  );
};

export default UserSearch;
