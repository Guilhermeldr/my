// const conductorService = ConductorService.getInstance();

// const ConductorControls: React.FC = () => {
//   const controller = useVxdkController();
//   const channel = useChannelStore(selectChannel);
//   const isModerator = useChannelStore(selectIsModerator);
//   const isPresenter = useChannelStore(selectIsPresenter);

//   const theme = useTheme();
//   const currentTime = useVxdkContext(({ state }) => state.currentTime);
//   const [showControls, setShowControls] = React.useState(false);

//   const playing = useVxdkContext(({ state }) => state.playing);
//   const muted = useVxdkContext(({ state }) => state.muted);
//   const volume = useVxdkContext(({ state }) => state.volume);
//   const duration = useVxdkContext(({ state }) => state.duration);

//   const progress = React.useMemo(() => {
//     return ConversionUtils.timeDurationToPercent(currentTime, duration);
//   }, [duration, currentTime]);

//   const updateSyncTime = React.useCallback(
//     async (throttle = false) => {
//       if (!controller) return;

//       const syncData: SourcePlayerDto = {
//         currentTime: controller.getCurrentTime(),
//         playing: controller.isPlaying(),
//         volume: controller.getVolume(),
//         muted: controller.isMuted(),
//         lockControls: true,
//       };

//       if (throttle) {
//         await conductorService.throttleUpdateSync(channel.id, syncData);
//       } else {
//         await conductorService.sendSyncData(channel.id, syncData);
//       }
//     },
//     [controller, channel]
//   );

//   const triggerConfetti = React.useCallback(async () => {
//     await conductorService.sendActionData(channel.id, {
//       type: ActionType.CONFETTI,
//       id: Date.now().toString(),
//     });
//   }, []);

//   const sendMessageAsParticipant = React.useCallback(async () => {
//     const uuid = faker.datatype.uuid();
//     const dto: CreateMessageDto = {
//       userId: uuid,
//       type: EnumCreateMessageDtoType.Text,
//       content: faker.lorem.sentence(),
//       sender: {
//         userId: uuid,
//         displayName: faker.name.findName(),
//         role: EnumSenderRole.VIEWER,
//       },
//     };
//     await MessageAPI.create(channel.id, dto);
//   }, []);

//   const triggerPoll = React.useCallback(async (on: boolean) => {
//     await conductorService.sendActionData(channel.id, {
//       type: ActionType.POLL,
//       id: Date.now().toString(),
//       data: on,
//     });
//   }, []);

//   React.useEffect(() => {
//     updateSyncTime(true);
//   }, [currentTime, playing]);

//   const togglePlayPause = React.useCallback(() => {
//     if (controller.isPlaying()) {
//       controller.pause();
//     } else {
//       controller.play();
//     }

//     updateSyncTime();
//   }, [updateSyncTime, controller]);

//   const handleSeek = React.useCallback(
//     (value: number) => {
//       if (!value) return;

//       controller.seekToPercentage(value);

//       FunctionUtils.defer(updateSyncTime);
//     },
//     [updateSyncTime, controller, currentTime]
//   );

//   const toggleMute = React.useCallback(() => {
//     controller.toggleMute();
//     FunctionUtils.defer(updateSyncTime);
//   }, [controller]);

//   const renderPlayPauseButton = () => {
//     if (!playing) {
//       return <IconButton icon="play" onPress={togglePlayPause} />;
//     } else {
//       return <IconButton icon="pause" onPress={togglePlayPause} />;
//     }
//   };

//   const renderVolumeButton = () => {
//     return (
//       <IconButton
//         icon={muted ? "volume-off" : "volume-high"}
//         onPress={toggleMute}
//       />
//     );
//   };

//   const renderPollButton = () => {
//     return <IconButton icon="ballot" onPress={toggleMute} />;
//   };

//   const renderTimeDisplay = () => {
//     return (
//       <Row>
//         <Caption>{ConversionUtils.secondsToHMS(currentTime)}</Caption>
//         <Spacer8 />
//         <Caption>/</Caption>
//         <Spacer8 />
//         <Caption>{ConversionUtils.secondsToHMS(duration)}</Caption>
//       </Row>
//     );
//   };

//   const renderControlButton = () => {
//     return (
//       <IconButton
//         icon={showControls ? "google-controller-off" : "google-controller"}
//         onPress={() => setShowControls(!showControls)}
//       />
//     );
//   };

//   return (
//     <Column flex={1} borderTopWidth={1}>
//       {isModerator && (
//         <Slider
//           minimumValue={0}
//           style={{ height: 10 }}
//           maximumValue={100}
//           value={progress}
//           minimumTrackTintColor={theme.colors.primary}
//           maximumTrackTintColor="#444"
//           thumbTintColor={theme.colors.primary}
//           onSlidingComplete={handleSeek}
//         />
//       )}

//       <Row alignItems="center">
//         {renderPlayPauseButton()}
//         {renderVolumeButton()}

//         {isPresenter && (
//           <Fragment>
//             <Spacer16 />
//             <VerticalDivider />
//             <Spacer16 />

//             <SpeakerControls />
//           </Fragment>
//         )}
//         <Spacer16 />
//         <VerticalDivider />
//         <Spacer16 />

//         <IconButton icon="party-popper" onPress={triggerConfetti} />
//         <IconButton icon="ballot" onPress={() => triggerPoll(true)} />
//         <IconButton icon="chat" onPress={sendMessageAsParticipant} />
//         <IconButton icon="ballot-outline" onPress={() => triggerPoll(false)} />
//         <FlexSpacer />
//         <Caption>{renderTimeDisplay()}</Caption>

//         <Spacer16 />
//       </Row>
//     </Column>
//   );
// };

// export default ConductorControls;
