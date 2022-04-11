/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class ChannelsService {
  /**
   *
   */
  static channelControllerCreate(
    params: {
      /** requestBody */
      body?: CreateChannelRequestDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static channelControllerFindAll(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static channelControllerCanJoin(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CanJoinChannelResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{id}/canJoin';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static channelControllerFindOne(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static channelControllerUpdate(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: UpdateChannelDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static channelControllerRemove(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static channelControllerJoin(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: JoinChannelRequestDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<JoinChannelResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{id}/join';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static channelControllerSendMessage(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: SendMessageDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{id}/sendMessage';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static channelControllerSendBroadcast(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: SendBroadcastDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{id}/sendBroadcast';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class MessagesService {
  /**
   *
   */
  static messagesControllerCreate(
    params: {
      /**  */
      channelId: string;
      /** requestBody */
      body?: CreateMessageDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/messages';
      url = url.replace('{channelId}', params['channelId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static messagesControllerRemove(
    params: {
      /**  */
      id: string;
      /**  */
      channelId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/messages/{id}';
      url = url.replace('{id}', params['id'] + '');
      url = url.replace('{channelId}', params['channelId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static messagesControllerFindById(
    params: {
      /**  */
      id: string;
      /**  */
      channelId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Message> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/messages/{id}';
      url = url.replace('{id}', params['id'] + '');
      url = url.replace('{channelId}', params['channelId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ParticipantsService {
  /**
   *
   */
  static participantControllerCreate(
    params: {
      /**  */
      channelId: string;
      /** requestBody */
      body?: CreateParticipantDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/participants/{participantId}';
      url = url.replace('{channelId}', params['channelId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static participantControllerFindAll(
    params: {
      /**  */
      channelId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Participant[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/participants/{participantId}';
      url = url.replace('{channelId}', params['channelId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static participantControllerChangeRole(
    params: {
      /**  */
      channelId: string;
      /** requestBody */
      body?: ChangeParticipantRoleDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/participants/{participantId}/role';
      url = url.replace('{channelId}', params['channelId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static participantControllerFindOne(
    params: {
      /**  */
      channelId: string;
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/participants/{participantId}/{id}';
      url = url.replace('{channelId}', params['channelId'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static participantControllerUpdate(
    params: {
      /**  */
      channelId: string;
      /**  */
      id: string;
      /** requestBody */
      body?: UpdateParticipantDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/participants/{participantId}/{id}';
      url = url.replace('{channelId}', params['channelId'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static participantControllerRemove(
    params: {
      /**  */
      channelId: string;
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/participants/{participantId}/{id}';
      url = url.replace('{channelId}', params['channelId'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static participantControllerUpdateMetadata(
    params: {
      /**  */
      channelId: string;
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/participants/{participantId}/{id}/metadata';
      url = url.replace('{channelId}', params['channelId'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static pollControllerCreate(
    params: {
      /** requestBody */
      body?: CreatePollDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/polls';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static pollControllerUpdate(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: UpdatePollDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/polls/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static pollControllerRemove(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/polls/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class PresenceService {
  /**
   *
   */
  static presenceControllerFindOne(
    params: {
      /**  */
      channelId: string;
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Presence> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/channels/{channelId}/participants/{participantId}/presence/{id}';
      url = url.replace('{channelId}', params['channelId'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class AnalyticsService {
  /**
   *
   */
  static analyticsControllerPing(options: IRequestOptions = {}): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/analytics/ping';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ChannelMetadata {
  /**  */
  'liveUsers'?: number;

  /**  */
  'totalUsers'?: number;

  constructor(data: undefined | any = {}) {
    this['liveUsers'] = data['liveUsers'];
    this['totalUsers'] = data['totalUsers'];
  }
}

export class ChannelPrivateMetadata {
  /**  */
  'hmsRoomId'?: string;

  /**  */
  'passcode'?: string;

  constructor(data: undefined | any = {}) {
    this['hmsRoomId'] = data['hmsRoomId'];
    this['passcode'] = data['passcode'];
  }
}

export class CreateChannelRequestDto {
  /**  */
  'name': string;

  /**  */
  'description': string;

  /**  */
  'type': EnumCreateChannelRequestDtoType;

  /**  */
  'metadata'?: ChannelMetadata;

  /**  */
  '_private'?: ChannelPrivateMetadata;

  constructor(data: undefined | any = {}) {
    this['name'] = data['name'];
    this['description'] = data['description'];
    this['type'] = data['type'];
    this['metadata'] = data['metadata'];
    this['_private'] = data['_private'];
  }
}

export class CanJoinChannelResponseDto {
  /**  */
  'needPasscode': boolean;

  /**  */
  'canJoin': boolean;

  constructor(data: undefined | any = {}) {
    this['needPasscode'] = data['needPasscode'];
    this['canJoin'] = data['canJoin'];
  }
}

export class UpdateChannelDto {
  /**  */
  'userId'?: string;

  /**  */
  'name'?: string;

  /**  */
  'description'?: string;

  /**  */
  'type'?: EnumUpdateChannelDtoType;

  /**  */
  'metadata'?: ChannelMetadata;

  /**  */
  '_private'?: ChannelPrivateMetadata;

  constructor(data: undefined | any = {}) {
    this['userId'] = data['userId'];
    this['name'] = data['name'];
    this['description'] = data['description'];
    this['type'] = data['type'];
    this['metadata'] = data['metadata'];
    this['_private'] = data['_private'];
  }
}

export class JoinChannelRequestDto {
  /**  */
  'passcode'?: string;

  constructor(data: undefined | any = {}) {
    this['passcode'] = data['passcode'];
  }
}

export class JoinChannelResponseDto {
  /**  */
  'appToken': string;

  constructor(data: undefined | any = {}) {
    this['appToken'] = data['appToken'];
  }
}

export class MessageMetadata {
  /**  */
  'imageUrl'?: string;

  constructor(data: undefined | any = {}) {
    this['imageUrl'] = data['imageUrl'];
  }
}

export class VideoMetadataDto {
  /**  */
  'timestamp'?: number;

  constructor(data: undefined | any = {}) {
    this['timestamp'] = data['timestamp'];
  }
}

export class SendMessageDto {
  /**  */
  'type': EnumSendMessageDtoType;

  /**  */
  'content': string;

  /**  */
  'metadata'?: MessageMetadata;

  /**  */
  'videoMetadata'?: VideoMetadataDto;

  constructor(data: undefined | any = {}) {
    this['type'] = data['type'];
    this['content'] = data['content'];
    this['metadata'] = data['metadata'];
    this['videoMetadata'] = data['videoMetadata'];
  }
}

export class SendBroadcastDto {
  /**  */
  'data': object;

  /**  */
  'type': string;

  /**  */
  'videoMetadata'?: VideoMetadataDto;

  constructor(data: undefined | any = {}) {
    this['data'] = data['data'];
    this['type'] = data['type'];
    this['videoMetadata'] = data['videoMetadata'];
  }
}

export class Sender {
  /**  */
  'userId': string;

  /**  */
  'displayName': string;

  /**  */
  'role': EnumSenderRole;

  constructor(data: undefined | any = {}) {
    this['userId'] = data['userId'];
    this['displayName'] = data['displayName'];
    this['role'] = data['role'];
  }
}

export class CreateMessageDto {
  /**  */
  'userId': string;

  /**  */
  'type': EnumCreateMessageDtoType;

  /**  */
  'sender': Sender;

  /**  */
  'content': string;

  /**  */
  'metadata'?: MessageMetadata;

  /**  */
  'videoMetadata'?: VideoMetadataDto;

  constructor(data: undefined | any = {}) {
    this['userId'] = data['userId'];
    this['type'] = data['type'];
    this['sender'] = data['sender'];
    this['content'] = data['content'];
    this['metadata'] = data['metadata'];
    this['videoMetadata'] = data['videoMetadata'];
  }
}

export class Message {
  /**  */
  'type': EnumMessageType;

  /**  */
  'sender': Sender;

  /**  */
  'content': string;

  /**  */
  'metadata'?: MessageMetadata;

  /**  */
  'videoMetadata'?: VideoMetadataDto;

  /**  */
  'userId': string;

  /**  */
  'createdAt': Date;

  /**  */
  'updatedAt': Date;

  constructor(data: undefined | any = {}) {
    this['type'] = data['type'];
    this['sender'] = data['sender'];
    this['content'] = data['content'];
    this['metadata'] = data['metadata'];
    this['videoMetadata'] = data['videoMetadata'];
    this['userId'] = data['userId'];
    this['createdAt'] = data['createdAt'];
    this['updatedAt'] = data['updatedAt'];
  }
}

export class CreateParticipantDto {
  /**  */
  'userId': string;

  /**  */
  'displayName': string;

  /**  */
  'role': EnumCreateParticipantDtoRole;

  /**  */
  'metadata'?: object;

  constructor(data: undefined | any = {}) {
    this['userId'] = data['userId'];
    this['displayName'] = data['displayName'];
    this['role'] = data['role'];
    this['metadata'] = data['metadata'];
  }
}

export class ChangeParticipantRoleDto {
  /**  */
  'userId': string;

  /**  */
  'role': EnumChangeParticipantRoleDtoRole;

  constructor(data: undefined | any = {}) {
    this['userId'] = data['userId'];
    this['role'] = data['role'];
  }
}

export class Participant {
  /**  */
  'displayName': string;

  /**  */
  'role': EnumParticipantRole;

  /**  */
  'metadata'?: object;

  /**  */
  'createdAt': Date;

  /**  */
  'updatedAt': Date;

  /**  */
  'userId': string;

  constructor(data: undefined | any = {}) {
    this['displayName'] = data['displayName'];
    this['role'] = data['role'];
    this['metadata'] = data['metadata'];
    this['createdAt'] = data['createdAt'];
    this['updatedAt'] = data['updatedAt'];
    this['userId'] = data['userId'];
  }
}

export class UpdateParticipantDto {
  /**  */
  'userId'?: string;

  /**  */
  'displayName'?: string;

  /**  */
  'role'?: EnumUpdateParticipantDtoRole;

  /**  */
  'metadata'?: object;

  constructor(data: undefined | any = {}) {
    this['userId'] = data['userId'];
    this['displayName'] = data['displayName'];
    this['role'] = data['role'];
    this['metadata'] = data['metadata'];
  }
}

export class ParticipantReferenceDto {
  /**  */
  'userId': string;

  /**  */
  'displayName': string;

  /**  */
  'role': EnumParticipantReferenceDtoRole;

  /**  */
  'metadata'?: object;

  constructor(data: undefined | any = {}) {
    this['userId'] = data['userId'];
    this['displayName'] = data['displayName'];
    this['role'] = data['role'];
    this['metadata'] = data['metadata'];
  }
}

export class Presence {
  /**  */
  'participant': ParticipantReferenceDto;

  /**  */
  'deviceId': string;

  /**  */
  'status'?: EnumPresenceStatus;

  /**  */
  'metadata'?: object;

  /**  */
  'createdAt': Date;

  /**  */
  'updatedAt': Date;

  /**  */
  'userId': string;

  constructor(data: undefined | any = {}) {
    this['participant'] = data['participant'];
    this['deviceId'] = data['deviceId'];
    this['status'] = data['status'];
    this['metadata'] = data['metadata'];
    this['createdAt'] = data['createdAt'];
    this['updatedAt'] = data['updatedAt'];
    this['userId'] = data['userId'];
  }
}

export class CreatePollDto {
  /**  */
  'channelId': string;

  /**  */
  'userId': string;

  /**  */
  'title': string;

  /**  */
  'description': string;

  /**  */
  'startAt': Date;

  /**  */
  'endAt': Date;

  /**  */
  'responsesCount': number;

  /**  */
  'metadata': object;

  constructor(data: undefined | any = {}) {
    this['channelId'] = data['channelId'];
    this['userId'] = data['userId'];
    this['title'] = data['title'];
    this['description'] = data['description'];
    this['startAt'] = data['startAt'];
    this['endAt'] = data['endAt'];
    this['responsesCount'] = data['responsesCount'];
    this['metadata'] = data['metadata'];
  }
}

export class UpdatePollDto {
  /**  */
  'channelId'?: string;

  /**  */
  'userId'?: string;

  /**  */
  'title'?: string;

  /**  */
  'description'?: string;

  /**  */
  'startAt'?: Date;

  /**  */
  'endAt'?: Date;

  /**  */
  'responsesCount'?: number;

  /**  */
  'metadata'?: object;

  constructor(data: undefined | any = {}) {
    this['channelId'] = data['channelId'];
    this['userId'] = data['userId'];
    this['title'] = data['title'];
    this['description'] = data['description'];
    this['startAt'] = data['startAt'];
    this['endAt'] = data['endAt'];
    this['responsesCount'] = data['responsesCount'];
    this['metadata'] = data['metadata'];
  }
}

export class CreateMulticdnDto {
  constructor(data: undefined | any = {}) {}
}

export class UpdateMulticdnDto {
  constructor(data: undefined | any = {}) {}
}
export enum EnumCreateChannelRequestDtoType {
  'Group' = 'Group',
  'Public' = 'Public',
  'Direct' = 'Direct'
}
export enum EnumUpdateChannelDtoType {
  'Group' = 'Group',
  'Public' = 'Public',
  'Direct' = 'Direct'
}
export enum EnumSendMessageDtoType {
  'Text' = 'Text',
  'SuperReaction' = 'SuperReaction'
}
export enum EnumSenderRole {
  'ADMIN' = 'ADMIN',
  'PRESENTER' = 'PRESENTER',
  'MODERATOR' = 'MODERATOR',
  'VIEWER' = 'VIEWER'
}
export enum EnumCreateMessageDtoType {
  'Text' = 'Text',
  'SuperReaction' = 'SuperReaction'
}
export enum EnumMessageType {
  'Text' = 'Text',
  'SuperReaction' = 'SuperReaction'
}
export enum EnumCreateParticipantDtoRole {
  'ADMIN' = 'ADMIN',
  'PRESENTER' = 'PRESENTER',
  'MODERATOR' = 'MODERATOR',
  'VIEWER' = 'VIEWER'
}
export enum EnumChangeParticipantRoleDtoRole {
  'ADMIN' = 'ADMIN',
  'PRESENTER' = 'PRESENTER',
  'MODERATOR' = 'MODERATOR',
  'VIEWER' = 'VIEWER'
}
export enum EnumParticipantRole {
  'ADMIN' = 'ADMIN',
  'PRESENTER' = 'PRESENTER',
  'MODERATOR' = 'MODERATOR',
  'VIEWER' = 'VIEWER'
}
export enum EnumUpdateParticipantDtoRole {
  'ADMIN' = 'ADMIN',
  'PRESENTER' = 'PRESENTER',
  'MODERATOR' = 'MODERATOR',
  'VIEWER' = 'VIEWER'
}
export enum EnumParticipantReferenceDtoRole {
  'ADMIN' = 'ADMIN',
  'PRESENTER' = 'PRESENTER',
  'MODERATOR' = 'MODERATOR',
  'VIEWER' = 'VIEWER'
}
export enum EnumPresenceStatus {
  'ONLINE' = 'ONLINE',
  'OFFLINE' = 'OFFLINE'
}
