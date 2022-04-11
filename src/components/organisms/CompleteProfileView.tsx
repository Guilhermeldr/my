import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@hope-ui/solid";
import { updateProfile } from "firebase/auth";
import { Component, createSignal, onMount } from "solid-js";
import { firebaseAuth } from "../../api/firebase";

const CompleteProfileView: Component = (props) => {
  const [value, setValue] = createSignal("");

  const [isOpen, setIsOpen] = createSignal(false);

  const handleInput = (event: any) => setValue(event.target.value);

  const handleSubmit = async () => {
    await updateProfile(firebaseAuth.currentUser, { displayName: value() });
    await firebaseAuth.currentUser.getIdToken(true);
    setIsOpen(false);
  };

  onMount(() => {
    if (!firebaseAuth.currentUser.displayName) {
      setIsOpen(true);
    }
  });

  const onKeyDown = (code: string) => {
    if (code === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <Modal centered opened={isOpen()} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent width={300}>
          <ModalHeader>Complete Profile</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Display Name"
              onInput={handleInput}
              value={value()}
              onKeyDown={(event) => {
                onKeyDown(event.code);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button flex={1} onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompleteProfileView;
