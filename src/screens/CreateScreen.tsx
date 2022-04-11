import {
  Alert,
  AlertIcon,
  Button,
  createDisclosure,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@hope-ui/solid";
import { useNavigate } from "solid-app-router";
import { Component, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import {
  CreateChannelRequestDto,
  EnumCreateChannelRequestDtoType,
} from "../api/sdk";
import ChannelAPI from "../api/services/channel.service";

type FormFields = {
  name: CreateChannelRequestDto["name"];
  nftAddress: CreateChannelRequestDto["metadata"]["nftAddress"];
  videoUrl: CreateChannelRequestDto["metadata"]["videoUrl"];
};

const CreateScreen: Component = () => {
  const { isOpen, onOpen, onClose } = createDisclosure();
  const navigate = useNavigate();

  const [form, setForm] = createStore<FormFields>({
    name: "",
    nftAddress: "",
    videoUrl: "",
  });

  onMount(() => {
    if (!isOpen()) {
      onOpen();
    }
  });

  const updateFormField = (fieldName: keyof FormFields) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    setForm({
      [fieldName]: inputElement.value,
    });
  };

  const onFormSubmit = async () => {
    const channelId = await ChannelAPI.createChannel({
      name: form.name,
      metadata: { nftAddress: form.nftAddress, videoUrl: form.videoUrl },
      description: "",
      type: EnumCreateChannelRequestDtoType.Public,
    });

    navigate(`/channels/${channelId}`);
  };

  return (
    <Modal
      opened={isOpen()}
      centered
      initialFocus="#name" // Focus on the element with id `firstname`
      onClose={() => {}}
    >
      <ModalOverlay />
      <ModalContent>
        {/* <ModalCloseButton /> */}
        <ModalHeader>
          <Heading mb="$4">Create a Watch Party</Heading>

          <Alert status="info" variant="top-accent">
            <AlertIcon mr="$2_5" />
            You can create a party to watch subsecond synced video across
            everyone.
          </Alert>
        </ModalHeader>
        <ModalBody>
          <FormControl id="name" mb="$4">
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              onChange={updateFormField("name")}
              value={form.name}
            />
          </FormControl>

          {/* <FormControl id="description" mb="$4">
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Description" />
          </FormControl> */}

          <FormControl id="nft" mb="$4">
            <FormLabel>NFT Contract</FormLabel>
            <InputGroup>
              <InputLeftAddon>#</InputLeftAddon>
              <Input
                placeholder="Contract Address"
                onChange={updateFormField("nftAddress")}
                value={form.nftAddress}
              />
            </InputGroup>
            <FormHelperText>
              Only users with this NFT collection contract can participate{" "}
            </FormHelperText>
          </FormControl>

          <FormControl id="videoUrl">
            <FormLabel>Video URL</FormLabel>
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input
                placeholder="Link to Video"
                onChange={updateFormField("videoUrl")}
                value={form.videoUrl}
              />
            </InputGroup>
            <FormHelperText>
              Currently support MP4 and HLS (.m3u8)
            </FormHelperText>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="subtle" onClick={onFormSubmit}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateScreen;
