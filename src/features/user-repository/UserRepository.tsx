import { RequestQuery, githubAPI } from "@/api/api";
import { RepoModel } from "@/models/repoModel";
import { UserModel } from "@/models/userModel";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import RepositoryCard from "./components/RepositoryCard";

type Props = {
  user: UserModel;
};

const UserRepository: FC<Props> = ({ user }) => {
  const [repos, setRepos] = useState<Array<RepoModel>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PER_PAGE = 5;

  const query: RequestQuery = {
    per_page: PER_PAGE,
    page: currentPage,
  };

  const {
    data: repoRes,
    error: repoError,
    isLoading: isRepoLoading,
  } = useInfiniteQuery({
    queryKey: ["repo", user.login],
    queryFn: ({ pageParam = 1 }) =>
      githubAPI.getRepo(user.login, {
        ...query,
        page: pageParam,
      }),
    getNextPageParam: () => currentPage + 1,
  });

  useEffect(() => {
    if (repoRes) {
      const allRepos = repoRes.pages.flatMap((page) => page);
      const newRepos = allRepos.slice(-5);
      setRepos((prevRepos) => [...prevRepos, ...newRepos]);
    } else {
      if (user) {
        setRepos([]);
        setCurrentPage(1);
      }
    }
  }, [repoRes, user]);

  return (
    <div>
      <VStack>
        <Accordion mt="1.5" defaultIndex={[0]} allowMultiple>
          <AccordionItem key={user?.id}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                  {user?.login}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel height="xl">
              <Box display="flex" mb="32px" h="10">
                <div style={{ maxHeight: "300px" }}>
                  {repos?.map((repo) => (
                    <RepositoryCard repo={repo} />
                  ))}

                  {isRepoLoading ? (
                    <div className="d-flex justify-content-center">
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      />
                    </div>
                  ) : null}

                  {repoError ? (
                    <div>
                      <p>No Repository Found!</p>
                    </div>
                  ) : null}
                </div>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </div>
  );
};

export default UserRepository;
