import { useEffect, useState } from "react";
import { User } from "../../interfaces/interfaces";
import { Button } from "../Button";
import { EditUserModal } from "../modals/EditUserModal";
import { useGetMe, useUpdateUser } from "../../api/user";
import { ClipLoader } from "react-spinners";
import { NewPasswordModal } from "../modals/PasswordModal";

export const ProfilePageContent = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] =
    useState<boolean>(false);
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] =
    useState<boolean>(false);
  const { data, isSuccess, isLoading } = useGetMe();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    if (isSuccess) setUser(data);
  }, [isSuccess, data]);
  const { mutate } = useUpdateUser();
  const handleEditUser = (
    firstName: string,
    lastName: string,
    email: string
  ) => {
    if (user) {
      mutate({ firstName, lastName, email });
      setUser({ ...user, firstName, lastName, email });
      setIsEditProfileModalOpen(false);
    }
  };
  const handleEditPassword = (password: string) => {
    if (user) {
      mutate({ password });
      setIsEditPasswordModalOpen(false);
    }
  };

  return (
    <>
      <ClipLoader color="#3498db" loading={isLoading} size={50} />
      {user ? (
        <div className="p-10 w-full flex flex-col items-center justify-center">
          <img
            src={user?.profileImage}
            alt="Profile"
            className="rounded-full bg-blue-500 my-3 cursor-pointer max-w-[300px] w-full h-auto"
          />
          <div className="flex flex-col gap-4">
            <div className="sm:text-4xl text-xl flex flex-row justfy-center items-end">
              First name:{" "}
              <div className="sm:text-3xl text-l ml-4">{user.firstName}</div>
            </div>
            <div className="sm:text-4xl text-xl flex flex-row justfy-center items-end">
              Last name:{" "}
              <div className="sm:text-3xl text-l ml-4">{user.lastName}</div>
            </div>
            <div className="sm:text-4xl text-xl flex flex-row justfy-center items-end">
              E-mail:<div className="sm:text-3xl text-l ml-4">{user.email}</div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-2 mt-5">
            <Button
              title={"Edit Profile"}
              onClick={() => setIsEditProfileModalOpen(true)}
            />
            <Button
              title={"Change Password"}
              onClick={() => setIsEditPasswordModalOpen(true)}
            />
          </div>
          <EditUserModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            onSave={handleEditUser}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
          />
          <NewPasswordModal
            isOpen={isEditPasswordModalOpen}
            onSave={handleEditPassword}
            onClose={() => setIsEditPasswordModalOpen(false)}
          />
        </div>
      ) : (
        <ClipLoader color="#3498db" loading={true} size={50} />
      )}
    </>
  );
};
