import {
  CommandDto,
  CommandType,
  ControllerCommandDto,
  PluginCommandDto,
  SourcePlayerDto,
  SyncPlayerCommandDto,
} from "@bitwild/vxdk";
import {
  DatabaseReference,
  onValue,
  push,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import { Timestamp } from "firebase/firestore";
import throttle from "lodash/throttle";
import { FirebaseCollections, firebaseDb } from "../firebase";
import { ActionDto } from "../dto/actions.dto";

class ConductorService {
  private static instance: ConductorService;
  public throttleUpdateSync: (
    channelId: string,
    dto: SourcePlayerDto
  ) => Promise<void>;
  private constructor() {
    this.throttleUpdateSync = throttle(this.sendSyncData, 2000);
  }

  private getSyncDataRef(channelId: string): DatabaseReference {
    return FirebaseCollections.conductorSync(channelId);
  }

  private getActionDataRef(channelId: string): DatabaseReference {
    return FirebaseCollections.conductorBroadcasts(channelId);
  }

  public static getInstance(): ConductorService {
    if (!ConductorService.instance) {
      ConductorService.instance = new ConductorService();
    }

    return ConductorService.instance;
  }

  public async sendSyncData(channelId: string, playerData: SourcePlayerDto) {
    const syncData: SyncPlayerCommandDto = {
      player: playerData,
      originSentAt: Timestamp.now().toMillis(),
      serverReceivedAt: serverTimestamp() as unknown as number,
    };

    await push(this.getSyncDataRef(channelId), syncData);
  }

  public async sendActionData(channelId: string, dto: ActionDto) {
    await set(this.getActionDataRef(channelId), dto);
  }

  private async triggerCommand(
    channelId: string,
    command: CommandDto | PluginCommandDto | ControllerCommandDto
  ): Promise<void> {
    await set(this.getSyncDataRef(channelId), command);
  }

  public async triggerPlugin(
    channelId: string,
    pluginName: string,
    action: string,
    args?: any[]
  ): Promise<void> {
    await this.triggerCommand(channelId, {
      pluginName: pluginName,
      type: CommandType.PLUGIN,
      action: action,
      arguments: args ?? null,
    });
  }
}

export default ConductorService;
