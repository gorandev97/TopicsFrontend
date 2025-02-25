import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/user";
import { Button } from "../Button";
import CommentImage from "../../assets/icons/chat-bubble.png";
import { formatNumber } from "../../helper/calculations";
import Spinner from "../loader/Spinner";

type UserData = {
  firstName: string;
  id: string;
  lastName: string;
  profileImage: string;
  _count: { comments: number };
};

export const MostActiveUsers = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0,
    });

  if (status === "pending") return <Spinner />;
  if (status === "error") return <div>Error loading users</div>;
  return (
    <>
      {data.pages.map((page, index) => (
        <div key={index} className="flex flex-row flex-wrap justify-between">
          {page.data.map((user: UserData) => (
            <div
              key={user.id}
              className="w-[500px] h-auto bg-gradient-to-b from-blue-200 to-blue-400 rounded-lg m-8 relative shadow-2xl flex flex-row justify-between"
            >
              <div className="flex flex-row ml-3">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-14 h-14 rounded-full bg-blue-500 my-3 cursor-pointer"
                />
                <div className=" ml-3 flex self-center">
                  <div>{user.firstName + " " + user.lastName}</div>
                </div>
              </div>
              <div className="flex flex-row mr-5 gap-2">
                <img
                  src={CommentImage}
                  alt="Profile"
                  className="w-8 h-8 self-center"
                />
                <div className="text-xl self-center">
                  {formatNumber(user._count.comments)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="self-center w-full flex justify-center items-center pb-10">
        {hasNextPage ? (
          <Button
            title={isFetchingNextPage ? "Loading more..." : "Load More"}
            onClick={() => fetchNextPage()}
            isDisabled={isFetchingNextPage}
          />
        ) : (
          <div className="text-xl font-bold text-blue-500">No more users</div>
        )}
      </div>
    </>
  );
};
