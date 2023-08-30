import { RepoModel } from "@/models/repoModel";
import { Box, Card, CardBody, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  repo: RepoModel;
};

const RepositoryCard: FC<Props> = ({ repo }) => {
  return (
    <Stack spacing="4">
      <Card variant="filled" maxW="sm" mb="8px">
        <CardBody maxW={"sm"}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize={{ lg: "xl" }} fontWeight="bold">
              {repo?.name}
            </Text>
            <Box display="flex" alignItems="center" gap="4px">
              <Text>{repo?.stargazers_count ?? "-"}</Text>
              <i className="fa-solid fa-star ms-1"></i>
            </Box>
          </Box>
          <Text fontSize="sm">{repo?.description ?? "-"}</Text>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default RepositoryCard;
