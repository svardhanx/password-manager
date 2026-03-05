import { CredentialType } from "@/types/password-credentials";
import MenuComponent from "./MenuComponent";
import PasswordRow from "./PasswordRow";

export default function CredentialCard({
  credential,
}: {
  credential: CredentialType;
}) {
  return (
    <div className="card-base flex flex-col gap-4 flex-auto">
      <div className="flex items-center justify-between w-full">
        <p className="text-heading dark:text-white text-base font-medium">
          {credential.websiteName}
        </p>
        <MenuComponent original={credential} />
      </div>
      <p className="text-sm text-sub-heading dark:text-white font-normal">
        {credential.email}
      </p>
      <PasswordRow original={credential} className="justify-between" />
    </div>
  );
}
