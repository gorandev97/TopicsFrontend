import { useNavigate, useSearchParams } from "react-router-dom";
import { NewPasswordModal } from "../components/modals/PasswordModal";
import { useResetPassword } from "../api/auth";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigation = useNavigate();
  const { mutate } = useResetPassword();
  const handleEditPassword = (password: string) => {
    mutate({ password, token });
    navigation("/");
  };

  return (
    <>
      <NewPasswordModal
        isOpen={true}
        onClose={() => {}}
        onSave={handleEditPassword}
      />
    </>
  );
};

export default ResetPassword;
