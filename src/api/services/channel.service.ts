import {
  AnalyticsService,
  ChannelsService,
  CreateParticipantDto,
  JoinChannelResponseDto,
  ParticipantsService,
  ChangeParticipantRoleDto,
  SendMessageDto,
  CreateChannelRequestDto,
  JoinChannelRequestDto,
  SendBroadcastDto,
} from "../sdk";
import { http } from "../helpers/http";

http;

class ChannelAPI {
  static async ping() {
    await AnalyticsService.analyticsControllerPing();
  }
  static async create(dto: CreateChannelRequestDto) {
    return ChannelsService.channelControllerCreate({ body: dto });
  }

  static async join(
    channelId: string,
    dto?: JoinChannelRequestDto
  ): Promise<JoinChannelResponseDto> {
    return ChannelsService.channelControllerJoin({ id: channelId, body: dto });
  }

  static async canJoin(channelId: string) {
    return ChannelsService.channelControllerCanJoin({ id: channelId });
  }

  static async promote(channelId: string, dto: ChangeParticipantRoleDto) {
    await ParticipantsService.participantControllerChangeRole({
      channelId,
      body: dto,
    });
  }

  static async addParticipant(channelId: string, dto: CreateParticipantDto) {
    return ParticipantsService.participantControllerCreate({
      channelId,
      body: dto,
    });
  }

  static async sendMessage(channelId: string, dto: SendMessageDto) {
    await ChannelsService.channelControllerSendMessage({
      id: channelId,
      body: dto,
    });
  }

  static async sendBroadcast(channelId: string, dto: SendBroadcastDto) {
    await ChannelsService.channelControllerSendBroadcast({
      id: channelId,
      body: dto,
    });
  }
}
export default ChannelAPI;
