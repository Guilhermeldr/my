import { AnalyticsService, CreateMessageDto, MessagesService } from "../sdk";
import { http } from "../helpers/http";

http;

class MessageAPI {
  static async ping() {
    await AnalyticsService.analyticsControllerPing();
  }
  static async create(channelId: string, dto: CreateMessageDto) {
    return MessagesService.messagesControllerCreate({ channelId, body: dto });
  }
}
export default MessageAPI;
