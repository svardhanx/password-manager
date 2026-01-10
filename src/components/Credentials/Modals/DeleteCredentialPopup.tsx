import { Button, Modal } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { closeDeletePasswordModal } from "@/store/slices/credentials";
import { useDeleteUserCredentialMutation } from "@/hooks/useDeleteUserCredentialMutation";

export default function DeleteCredentialPopup() {
  const dispatch = useAppDispatch();

  const status = useAppSelector(
    (state) => state.credentials.deletePassword.status
  );

  const helperData = useAppSelector(
    (state) => state.credentials.deletePassword.helperData
  );

  function handleClose() {
    dispatch(closeDeletePasswordModal());
  }

  const deleteUserCredentialMutation = useDeleteUserCredentialMutation();

  async function handleDelete() {
    if (!helperData?._id) return;

    await deleteUserCredentialMutation.mutateAsync(helperData?._id);

    handleClose();
  }

  return (
    <Modal opened={status} onClose={handleClose} centered size={"md"}>
      <div className="flex flex-col gap-2 mt-1 mb-3">
        <h2 className="font-bold text-lg text-black">
          Are you absolutely sure?
        </h2>
        <p className="text-black text-sm">
          This action cannot be undone and the entry for{" "}
          <span className="font-bold">{helperData?.websiteName}</span> will be
          permanently deleted.
        </p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="default" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="filled"
          color="red"
          className="text-white"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
