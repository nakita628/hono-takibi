import { createRoute, z } from '@hono/zod-openapi'

const SnowflakeTypeSchema = z
  .string()
  .regex(/^(0|[1-9][0-9]*)$/)
  .openapi('SnowflakeType')

const InteractionTypesSchema = z
  .xor([
    z
      .literal(1)
      .openapi({
        title: 'PING',
        description: "Sent by Discord to validate your application's interaction handler",
      }),
    z
      .literal(2)
      .openapi({
        title: 'APPLICATION_COMMAND',
        description: 'Sent when a user uses an application command',
      }),
    z
      .literal(3)
      .openapi({
        title: 'MESSAGE_COMPONENT',
        description:
          'Sent when a user interacts with a message component previously sent by your application',
      }),
    z
      .literal(4)
      .openapi({
        title: 'APPLICATION_COMMAND_AUTOCOMPLETE',
        description: 'Sent when a user is filling in an autocomplete option in a chat command',
      }),
    z
      .literal(5)
      .openapi({
        title: 'MODAL_SUBMIT',
        description: 'Sent when a user submits a modal previously sent by your application',
      }),
  ])
  .openapi('InteractionTypes')

const InteractionResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    response_message_id: SnowflakeTypeSchema.exactOptional(),
    response_message_loading: z.boolean().exactOptional(),
    response_message_ephemeral: z.boolean().exactOptional(),
    channel_id: SnowflakeTypeSchema.exactOptional(),
    guild_id: SnowflakeTypeSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'type'] })
  .openapi('InteractionResponse')

const InteractionCallbackTypesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'PONG' }),
    z.literal(4).openapi({ title: 'CHANNEL_MESSAGE_WITH_SOURCE' }),
    z.literal(5).openapi({ title: 'DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE' }),
    z.literal(6).openapi({ title: 'DEFERRED_UPDATE_MESSAGE' }),
    z.literal(7).openapi({ title: 'UPDATE_MESSAGE' }),
    z.literal(8).openapi({ title: 'APPLICATION_COMMAND_AUTOCOMPLETE_RESULT' }),
    z.literal(9).openapi({ title: 'MODAL' }),
    z.literal(12).openapi({ title: 'LAUNCH_ACTIVITY' }),
  ])
  .openapi('InteractionCallbackTypes')

const MessageResponseSchema: z.ZodType<MessageResponseType> = z
  .lazy(() =>
    z
      .object({
        type: MessageTypeSchema,
        content: z.string(),
        mentions: z.array(UserResponseSchema),
        mention_roles: z.array(SnowflakeTypeSchema),
        attachments: z.array(MessageAttachmentResponseSchema),
        embeds: z.array(MessageEmbedResponseSchema),
        timestamp: z.iso.datetime(),
        edited_timestamp: z.iso.datetime().nullable().exactOptional(),
        flags: z.int32(),
        components: z.array(
          z.xor([
            ActionRowComponentResponseSchema,
            ContainerComponentResponseSchema,
            FileComponentResponseSchema,
            MediaGalleryComponentResponseSchema,
            SectionComponentResponseSchema,
            SeparatorComponentResponseSchema,
            TextDisplayComponentResponseSchema,
          ]),
        ),
        stickers: z
          .array(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]))
          .exactOptional(),
        sticker_items: z.array(MessageStickerItemResponseSchema).exactOptional(),
        id: SnowflakeTypeSchema,
        channel_id: SnowflakeTypeSchema,
        author: UserResponseSchema,
        pinned: z.boolean(),
        mention_everyone: z.boolean(),
        tts: z.boolean(),
        call: MessageCallResponseSchema.exactOptional(),
        activity: MessageActivityResponseSchema.exactOptional(),
        application: BasicApplicationResponseSchema.exactOptional(),
        application_id: SnowflakeTypeSchema.exactOptional(),
        interaction: MessageInteractionResponseSchema.exactOptional(),
        nonce: z
          .xor([
            z.int64().min(-9223372036854776000n).max(9223372036854776000n),
            z.string().max(25),
            z.null().nullable(),
          ])
          .exactOptional(),
        webhook_id: SnowflakeTypeSchema.exactOptional(),
        message_reference: MessageReferenceResponseSchema.exactOptional(),
        thread: ThreadResponseSchema.exactOptional(),
        mention_channels: z
          .array(z.xor([z.null().nullable(), MessageMentionChannelResponseSchema]))
          .exactOptional(),
        role_subscription_data: MessageRoleSubscriptionDataResponseSchema.exactOptional(),
        purchase_notification: PurchaseNotificationResponseSchema.exactOptional(),
        position: z.int32().exactOptional(),
        resolved: ResolvedObjectsResponseSchema.exactOptional(),
        poll: PollResponseSchema.exactOptional(),
        shared_client_theme: z
          .xor([z.null().nullable(), CustomClientThemeResponseSchema])
          .exactOptional(),
        interaction_metadata: z
          .xor([
            ApplicationCommandInteractionMetadataResponseSchema,
            MessageComponentInteractionMetadataResponseSchema,
            ModalSubmitInteractionMetadataResponseSchema,
          ])
          .exactOptional(),
        message_snapshots: z.array(MessageSnapshotResponseSchema).exactOptional(),
        reactions: z.array(MessageReactionResponseSchema).exactOptional(),
        referenced_message: z
          .xor([z.null().nullable(), BasicMessageResponseSchema])
          .exactOptional(),
      })
      .openapi({
        required: [
          'type',
          'content',
          'mentions',
          'mention_roles',
          'attachments',
          'embeds',
          'timestamp',
          'flags',
          'components',
          'id',
          'channel_id',
          'author',
          'pinned',
          'mention_everyone',
          'tts',
        ],
      }),
  )
  .openapi('MessageResponse')

const CreateMessageInteractionCallbackResponseSchema = z
  .object({ type: InteractionCallbackTypesSchema, message: MessageResponseSchema })
  .openapi({ required: ['type', 'message'] })
  .openapi('CreateMessageInteractionCallbackResponse')

const LaunchActivityInteractionCallbackResponseSchema = z
  .object({ type: InteractionCallbackTypesSchema })
  .openapi({ required: ['type'] })
  .openapi('LaunchActivityInteractionCallbackResponse')

const UpdateMessageInteractionCallbackResponseSchema = z
  .object({ type: InteractionCallbackTypesSchema, message: MessageResponseSchema })
  .openapi({ required: ['type', 'message'] })
  .openapi('UpdateMessageInteractionCallbackResponse')

type InteractionCallbackResponseType = {
  interaction: z.infer<typeof InteractionResponseSchema>
  resource?:
    | z.infer<typeof CreateMessageInteractionCallbackResponseSchema>
    | z.infer<typeof LaunchActivityInteractionCallbackResponseSchema>
    | z.infer<typeof UpdateMessageInteractionCallbackResponseSchema>
}

const MessageTypeSchema = z
  .xor([
    z.literal(0).openapi({ title: 'DEFAULT', description: '' }),
    z.literal(1).openapi({ title: 'RECIPIENT_ADD', description: '' }),
    z.literal(2).openapi({ title: 'RECIPIENT_REMOVE', description: '' }),
    z.literal(3).openapi({ title: 'CALL', description: '' }),
    z.literal(4).openapi({ title: 'CHANNEL_NAME_CHANGE', description: '' }),
    z.literal(5).openapi({ title: 'CHANNEL_ICON_CHANGE', description: '' }),
    z.literal(6).openapi({ title: 'CHANNEL_PINNED_MESSAGE', description: '' }),
    z.literal(7).openapi({ title: 'USER_JOIN', description: '' }),
    z.literal(8).openapi({ title: 'GUILD_BOOST', description: '' }),
    z.literal(9).openapi({ title: 'GUILD_BOOST_TIER_1', description: '' }),
    z.literal(10).openapi({ title: 'GUILD_BOOST_TIER_2', description: '' }),
    z.literal(11).openapi({ title: 'GUILD_BOOST_TIER_3', description: '' }),
    z.literal(12).openapi({ title: 'CHANNEL_FOLLOW_ADD', description: '' }),
    z.literal(14).openapi({ title: 'GUILD_DISCOVERY_DISQUALIFIED', description: '' }),
    z.literal(15).openapi({ title: 'GUILD_DISCOVERY_REQUALIFIED', description: '' }),
    z
      .literal(16)
      .openapi({ title: 'GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING', description: '' }),
    z.literal(17).openapi({ title: 'GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING', description: '' }),
    z.literal(18).openapi({ title: 'THREAD_CREATED', description: '' }),
    z.literal(19).openapi({ title: 'REPLY', description: '' }),
    z.literal(20).openapi({ title: 'CHAT_INPUT_COMMAND', description: '' }),
    z.literal(21).openapi({ title: 'THREAD_STARTER_MESSAGE', description: '' }),
    z.literal(22).openapi({ title: 'GUILD_INVITE_REMINDER', description: '' }),
    z.literal(23).openapi({ title: 'CONTEXT_MENU_COMMAND', description: '' }),
    z.literal(24).openapi({ title: 'AUTO_MODERATION_ACTION', description: '' }),
    z.literal(25).openapi({ title: 'ROLE_SUBSCRIPTION_PURCHASE', description: '' }),
    z.literal(26).openapi({ title: 'INTERACTION_PREMIUM_UPSELL', description: '' }),
    z.literal(27).openapi({ title: 'STAGE_START', description: '' }),
    z.literal(28).openapi({ title: 'STAGE_END', description: '' }),
    z.literal(29).openapi({ title: 'STAGE_SPEAKER', description: '' }),
    z.literal(31).openapi({ title: 'STAGE_TOPIC', description: '' }),
    z.literal(32).openapi({ title: 'GUILD_APPLICATION_PREMIUM_SUBSCRIPTION', description: '' }),
    z.literal(36).openapi({ title: 'GUILD_INCIDENT_ALERT_MODE_ENABLED', description: '' }),
    z.literal(37).openapi({ title: 'GUILD_INCIDENT_ALERT_MODE_DISABLED', description: '' }),
    z.literal(38).openapi({ title: 'GUILD_INCIDENT_REPORT_RAID', description: '' }),
    z.literal(39).openapi({ title: 'GUILD_INCIDENT_REPORT_FALSE_ALARM', description: '' }),
    z.literal(46).openapi({ title: 'POLL_RESULT', description: '' }),
    z.literal(55).openapi({ title: 'HD_STREAMING_UPGRADED', description: '' }),
  ])
  .openapi('MessageType')

const Int53TypeSchema = z
  .int64()
  .min(-9007199254740991n)
  .max(9007199254740991n)
  .openapi('Int53Type')

const UserAvatarDecorationResponseSchema = z
  .object({
    asset: z.string(),
    sku_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  })
  .openapi({ required: ['asset'] })
  .openapi('UserAvatarDecorationResponse')

const NameplatePaletteSchema = z.any().openapi('NameplatePalette')

const UserNameplateResponseSchema = z
  .object({
    sku_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    asset: z.string(),
    label: z.string(),
    palette: NameplatePaletteSchema,
  })
  .openapi({ required: ['asset', 'label', 'palette'] })
  .openapi('UserNameplateResponse')

const UserCollectiblesResponseSchema = z
  .object({ nameplate: z.xor([z.null().nullable(), UserNameplateResponseSchema]).exactOptional() })
  .openapi('UserCollectiblesResponse')

const UserPrimaryGuildResponseSchema = z
  .object({
    identity_guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    identity_enabled: z.boolean().nullable().exactOptional(),
    tag: z.string().nullable().exactOptional(),
    badge: z.string().nullable().exactOptional(),
  })
  .openapi('UserPrimaryGuildResponse')

const UserResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    username: z.string(),
    avatar: z.string().nullable().exactOptional(),
    discriminator: z.string(),
    public_flags: z.int32(),
    flags: Int53TypeSchema,
    bot: z.boolean().exactOptional(),
    system: z.boolean().exactOptional(),
    banner: z.string().nullable().exactOptional(),
    accent_color: z.int32().nullable().exactOptional(),
    global_name: z.string().nullable().exactOptional(),
    avatar_decoration_data: z
      .xor([z.null().nullable(), UserAvatarDecorationResponseSchema])
      .exactOptional(),
    collectibles: z.xor([z.null().nullable(), UserCollectiblesResponseSchema]).exactOptional(),
    primary_guild: z.xor([z.null().nullable(), UserPrimaryGuildResponseSchema]).exactOptional(),
  })
  .openapi({ required: ['id', 'username', 'discriminator', 'public_flags', 'flags'] })
  .openapi('UserResponse')

const ApplicationTypesSchema = z
  .xor([z.literal(4).openapi({ title: 'GUILD_ROLE_SUBSCRIPTIONS' })])
  .openapi('ApplicationTypes')

const OAuth2ScopesSchema = z
  .xor([
    z
      .literal('identify')
      .openapi({ title: 'IDENTIFY', description: 'allows /users/@me without email' }),
    z
      .literal('email')
      .openapi({ title: 'EMAIL', description: 'enables /users/@me to return an email' }),
    z
      .literal('connections')
      .openapi({
        title: 'CONNECTIONS',
        description: 'allows /users/@me/connections to return linked third-party accounts',
      }),
    z
      .literal('guilds')
      .openapi({
        title: 'GUILDS',
        description:
          "allows /users/@me/guilds to return basic information about all of a user's guilds",
      }),
    z
      .literal('guilds.join')
      .openapi({
        title: 'GUILDS_JOIN',
        description:
          'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
      }),
    z
      .literal('guilds.members.read')
      .openapi({
        title: 'GUILDS_MEMBERS_READ',
        description:
          "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
      }),
    z
      .literal('gdm.join')
      .openapi({ title: 'GDM_JOIN', description: 'allows your app to join users to a group dm' }),
    z
      .literal('bot')
      .openapi({
        title: 'BOT',
        description: "for oauth2 bots, this puts the bot in the user's selected guild by default",
      }),
    z
      .literal('rpc')
      .openapi({
        title: 'RPC',
        description:
          "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
      }),
    z
      .literal('rpc.notifications.read')
      .openapi({
        title: 'RPC_NOTIFICATIONS_READ',
        description:
          'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
      }),
    z
      .literal('rpc.voice.read')
      .openapi({
        title: 'RPC_VOICE_READ',
        description:
          "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
      }),
    z
      .literal('rpc.voice.write')
      .openapi({
        title: 'RPC_VOICE_WRITE',
        description:
          "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
      }),
    z
      .literal('rpc.video.read')
      .openapi({
        title: 'RPC_VIDEO_READ',
        description:
          "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
      }),
    z
      .literal('rpc.video.write')
      .openapi({
        title: 'RPC_VIDEO_WRITE',
        description:
          "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
      }),
    z
      .literal('rpc.screenshare.read')
      .openapi({
        title: 'RPC_SCREENSHARE_READ',
        description:
          "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
      }),
    z
      .literal('rpc.screenshare.write')
      .openapi({
        title: 'RPC_SCREENSHARE_WRITE',
        description:
          "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
      }),
    z
      .literal('rpc.activities.write')
      .openapi({
        title: 'RPC_ACTIVITIES_WRITE',
        description:
          "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
      }),
    z
      .literal('webhook.incoming')
      .openapi({
        title: 'WEBHOOK_INCOMING',
        description:
          'this generates a webhook that is returned in the oauth token response for authorization code grants',
      }),
    z
      .literal('messages.read')
      .openapi({
        title: 'MESSAGES_READ',
        description:
          'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
      }),
    z
      .literal('applications.builds.upload')
      .openapi({
        title: 'APPLICATIONS_BUILDS_UPLOAD',
        description:
          "allows your app to upload/update builds for a user's applications - requires Discord approval",
      }),
    z
      .literal('applications.builds.read')
      .openapi({
        title: 'APPLICATIONS_BUILDS_READ',
        description: "allows your app to read build data for a user's applications",
      }),
    z
      .literal('applications.commands')
      .openapi({
        title: 'APPLICATIONS_COMMANDS',
        description: 'allows your app to use commands in a guild',
      }),
    z
      .literal('applications.commands.permissions.update')
      .openapi({
        title: 'APPLICATIONS_COMMANDS_PERMISSIONS_UPDATE',
        description:
          'allows your app to update permissions for its commands in a guild a user has permissions to',
      }),
    z
      .literal('applications.commands.update')
      .openapi({
        title: 'APPLICATIONS_COMMANDS_UPDATE',
        description:
          'allows your app to update its commands using a Bearer token - client credentials grant only',
      }),
    z
      .literal('applications.store.update')
      .openapi({
        title: 'APPLICATIONS_STORE_UPDATE',
        description:
          "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
      }),
    z
      .literal('applications.entitlements')
      .openapi({
        title: 'APPLICATIONS_ENTITLEMENTS',
        description: "allows your app to read entitlements for a user's applications",
      }),
    z
      .literal('activities.read')
      .openapi({
        title: 'ACTIVITIES_READ',
        description:
          'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
      }),
    z
      .literal('activities.write')
      .openapi({
        title: 'ACTIVITIES_WRITE',
        description:
          "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
      }),
    z
      .literal('activities.invites.write')
      .openapi({
        title: 'ACTIVITIES_INVITES_WRITE',
        description:
          'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
      }),
    z
      .literal('relationships.read')
      .openapi({
        title: 'RELATIONSHIPS_READ',
        description:
          "allows your app to know a user's friends and implicit relationships - requires Discord approval",
      }),
    z
      .literal('voice')
      .openapi({
        title: 'VOICE',
        description:
          "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
      }),
    z
      .literal('dm_channels.read')
      .openapi({
        title: 'DM_CHANNELS_READ',
        description:
          "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
      }),
    z
      .literal('role_connections.write')
      .openapi({
        title: 'ROLE_CONNECTIONS_WRITE',
        description: "allows your app to update a user's connection and metadata for the app",
      }),
    z
      .literal('openid')
      .openapi({
        title: 'OPENID',
        description:
          'for OpenID Connect, this allows your app to receive user id and basic profile information',
      }),
  ])
  .openapi('OAuth2Scopes')

const ApplicationOAuth2InstallParamsResponseSchema = z
  .object({ scopes: z.array(OAuth2ScopesSchema), permissions: z.string() })
  .openapi({ required: ['scopes', 'permissions'] })
  .openapi('ApplicationOAuth2InstallParamsResponse')

const ApplicationIntegrationTypeConfigurationResponseSchema = z
  .object({ oauth2_install_params: ApplicationOAuth2InstallParamsResponseSchema.exactOptional() })
  .openapi({ required: [] })
  .openapi('ApplicationIntegrationTypeConfigurationResponse')

const ApplicationResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    icon: z.string().nullable().exactOptional(),
    description: z.string(),
    type: z.xor([z.null().nullable(), ApplicationTypesSchema]).exactOptional(),
    cover_image: z.string().exactOptional(),
    primary_sku_id: SnowflakeTypeSchema.exactOptional(),
    bot: UserResponseSchema.exactOptional(),
    slug: z.string().exactOptional(),
    guild_id: SnowflakeTypeSchema.exactOptional(),
    rpc_origins: z.array(z.string().nullable()).exactOptional(),
    bot_public: z.boolean().exactOptional(),
    bot_require_code_grant: z.boolean().exactOptional(),
    terms_of_service_url: z.url().exactOptional(),
    privacy_policy_url: z.url().exactOptional(),
    custom_install_url: z.url().exactOptional(),
    install_params: ApplicationOAuth2InstallParamsResponseSchema.exactOptional(),
    integration_types_config: z
      .record(z.string(), ApplicationIntegrationTypeConfigurationResponseSchema)
      .exactOptional(),
    verify_key: z.string(),
    flags: z.int32(),
    max_participants: z.int32().nullable().exactOptional(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'description', 'verify_key', 'flags'] })
  .openapi('ApplicationResponse')

const MessageAttachmentResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    filename: z.string(),
    size: z.int32(),
    url: z.url(),
    proxy_url: z.url(),
    width: z.int32().exactOptional(),
    height: z.int32().exactOptional(),
    duration_secs: z.number().exactOptional(),
    waveform: z.string().exactOptional(),
    description: z.string().exactOptional(),
    content_type: z.string().exactOptional(),
    ephemeral: z.boolean().exactOptional(),
    title: z.string().nullable().exactOptional(),
    application: ApplicationResponseSchema.exactOptional(),
    clip_created_at: z.iso.datetime().exactOptional(),
    clip_participants: z.array(UserResponseSchema).exactOptional(),
  })
  .openapi({ required: ['id', 'filename', 'size', 'url', 'proxy_url'] })
  .openapi('MessageAttachmentResponse')

const MessageEmbedFieldResponseSchema = z
  .object({ name: z.string(), value: z.string(), inline: z.boolean() })
  .openapi({ required: ['name', 'value', 'inline'] })
  .openapi('MessageEmbedFieldResponse')

const MessageEmbedAuthorResponseSchema = z
  .object({
    name: z.string(),
    url: z.string().exactOptional(),
    icon_url: z.string().exactOptional(),
    proxy_icon_url: z.url().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('MessageEmbedAuthorResponse')

const MessageEmbedProviderResponseSchema = z
  .object({ name: z.string(), url: z.url().exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('MessageEmbedProviderResponse')

const UInt32TypeSchema = z.int64().min(0n).max(4294967295n).openapi('UInt32Type')

const MessageEmbedImageResponseSchema = z
  .object({
    url: z.string().exactOptional(),
    proxy_url: z.url().exactOptional(),
    width: UInt32TypeSchema.exactOptional(),
    height: UInt32TypeSchema.exactOptional(),
    content_type: z.string().exactOptional(),
    placeholder: z.string().exactOptional(),
    placeholder_version: UInt32TypeSchema.exactOptional(),
    description: z.string().exactOptional(),
    flags: UInt32TypeSchema.exactOptional(),
  })
  .openapi({ required: [] })
  .openapi('MessageEmbedImageResponse')

const MessageEmbedVideoResponseSchema = z
  .object({
    url: z.string().exactOptional(),
    proxy_url: z.url().exactOptional(),
    width: UInt32TypeSchema.exactOptional(),
    height: UInt32TypeSchema.exactOptional(),
    content_type: z.string().exactOptional(),
    placeholder: z.string().exactOptional(),
    placeholder_version: UInt32TypeSchema.exactOptional(),
    description: z.string().exactOptional(),
    flags: UInt32TypeSchema.exactOptional(),
  })
  .openapi({ required: [] })
  .openapi('MessageEmbedVideoResponse')

const MessageEmbedFooterResponseSchema = z
  .object({
    text: z.string(),
    icon_url: z.string().exactOptional(),
    proxy_icon_url: z.url().exactOptional(),
  })
  .openapi({ required: ['text'] })
  .openapi('MessageEmbedFooterResponse')

const MessageEmbedResponseSchema = z
  .object({
    type: z.string(),
    url: z.url().exactOptional(),
    title: z.string().exactOptional(),
    description: z.string().exactOptional(),
    color: z.int32().exactOptional(),
    timestamp: z.iso.datetime().exactOptional(),
    fields: z.array(MessageEmbedFieldResponseSchema).exactOptional(),
    author: MessageEmbedAuthorResponseSchema.exactOptional(),
    provider: MessageEmbedProviderResponseSchema.exactOptional(),
    image: MessageEmbedImageResponseSchema.exactOptional(),
    thumbnail: MessageEmbedImageResponseSchema.exactOptional(),
    video: MessageEmbedVideoResponseSchema.exactOptional(),
    footer: MessageEmbedFooterResponseSchema.exactOptional(),
  })
  .openapi({ required: ['type'] })
  .openapi('MessageEmbedResponse')

const MessageComponentTypesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'ACTION_ROW', description: 'Container for other components' }),
    z.literal(2).openapi({ title: 'BUTTON', description: 'Button object' }),
    z
      .literal(3)
      .openapi({
        title: 'STRING_SELECT',
        description: 'Select menu for picking from defined text options',
      }),
    z.literal(4).openapi({ title: 'TEXT_INPUT', description: 'Text input object' }),
    z.literal(5).openapi({ title: 'USER_SELECT', description: 'Select menu for users' }),
    z.literal(6).openapi({ title: 'ROLE_SELECT', description: 'Select menu for roles' }),
    z
      .literal(7)
      .openapi({
        title: 'MENTIONABLE_SELECT',
        description: 'Select menu for mentionables (users and roles)',
      }),
    z.literal(8).openapi({ title: 'CHANNEL_SELECT', description: 'Select menu for channels' }),
    z.literal(9).openapi({ title: 'SECTION', description: 'Section component' }),
    z.literal(10).openapi({ title: 'TEXT_DISPLAY', description: 'Text component' }),
    z.literal(11).openapi({ title: 'THUMBNAIL', description: 'Thumbnail component' }),
    z.literal(12).openapi({ title: 'MEDIA_GALLERY', description: 'Media gallery component' }),
    z.literal(13).openapi({ title: 'FILE', description: 'File component' }),
    z.literal(14).openapi({ title: 'SEPARATOR', description: 'Separator component' }),
    z.literal(17).openapi({ title: 'CONTAINER', description: 'Container component' }),
    z.literal(18).openapi({ title: 'LABEL', description: 'Label component' }),
    z.literal(19).openapi({ title: 'FILE_UPLOAD', description: 'File upload component' }),
  ])
  .openapi('MessageComponentTypes')

const ButtonStyleTypesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'PRIMARY' }),
    z.literal(2).openapi({ title: 'SECONDARY' }),
    z.literal(3).openapi({ title: 'SUCCESS' }),
    z.literal(4).openapi({ title: 'DANGER' }),
    z.literal(5).openapi({ title: 'LINK' }),
    z.literal(6).openapi({ title: 'PREMIUM' }),
  ])
  .openapi('ButtonStyleTypes')

const ComponentEmojiResponseSchema = z
  .object({
    id: SnowflakeTypeSchema.exactOptional(),
    name: z.string(),
    animated: z.boolean().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('ComponentEmojiResponse')

const ButtonComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    custom_id: z.string().exactOptional(),
    style: ButtonStyleTypesSchema,
    label: z.string().exactOptional(),
    disabled: z.boolean().exactOptional(),
    emoji: ComponentEmojiResponseSchema.exactOptional(),
    url: z.url().max(2048).nullable().exactOptional(),
    sku_id: SnowflakeTypeSchema.exactOptional(),
  })
  .openapi({ required: ['type', 'id', 'style'] })
  .openapi('ButtonComponentResponse')

const ChannelTypesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'DM', description: 'A direct message between users' }),
    z
      .literal(3)
      .openapi({ title: 'GROUP_DM', description: 'A direct message between multiple users' }),
    z.literal(0).openapi({ title: 'GUILD_TEXT', description: 'A text channel within a server' }),
    z.literal(2).openapi({ title: 'GUILD_VOICE', description: 'A voice channel within a server' }),
    z
      .literal(4)
      .openapi({
        title: 'GUILD_CATEGORY',
        description: 'An organizational category that contains up to 50 channels',
      }),
    z
      .literal(5)
      .openapi({
        title: 'GUILD_ANNOUNCEMENT',
        description:
          'A channel that users can follow and crosspost into their own server (formerly news channels)',
      }),
    z
      .literal(10)
      .openapi({
        title: 'ANNOUNCEMENT_THREAD',
        description: 'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
      }),
    z
      .literal(11)
      .openapi({
        title: 'PUBLIC_THREAD',
        description:
          'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
      }),
    z
      .literal(12)
      .openapi({
        title: 'PRIVATE_THREAD',
        description:
          'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
      }),
    z
      .literal(13)
      .openapi({
        title: 'GUILD_STAGE_VOICE',
        description: 'A voice channel for hosting events with an audience',
      }),
    z
      .literal(14)
      .openapi({
        title: 'GUILD_DIRECTORY',
        description: 'The channel in a hub containing the listed servers',
      }),
    z
      .literal(15)
      .openapi({ title: 'GUILD_FORUM', description: 'Channel that can only contain threads' }),
    z
      .literal(16)
      .openapi({
        title: 'GUILD_MEDIA',
        description: 'Channel that can only contain media threads',
      }),
  ])
  .openapi('ChannelTypes')

const SnowflakeSelectDefaultValueTypesSchema = z
  .xor([
    z.literal('user').openapi({ title: 'USER' }),
    z.literal('role').openapi({ title: 'ROLE' }),
    z.literal('channel').openapi({ title: 'CHANNEL' }),
  ])
  .openapi('SnowflakeSelectDefaultValueTypes')

const ChannelSelectDefaultValueResponseSchema = z
  .object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema })
  .openapi({ required: ['type', 'id'] })
  .openapi('ChannelSelectDefaultValueResponse')

const ChannelSelectComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    custom_id: z.string(),
    placeholder: z.string().exactOptional(),
    min_values: z.int32().nullable().exactOptional(),
    max_values: z.int32().nullable().exactOptional(),
    disabled: z.boolean().exactOptional(),
    channel_types: z.array(ChannelTypesSchema).exactOptional(),
    default_values: z.array(ChannelSelectDefaultValueResponseSchema).exactOptional(),
  })
  .openapi({ required: ['type', 'id', 'custom_id'] })
  .openapi('ChannelSelectComponentResponse')

const RoleSelectDefaultValueResponseSchema = z
  .object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema })
  .openapi({ required: ['type', 'id'] })
  .openapi('RoleSelectDefaultValueResponse')

const UserSelectDefaultValueResponseSchema = z
  .object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema })
  .openapi({ required: ['type', 'id'] })
  .openapi('UserSelectDefaultValueResponse')

const MentionableSelectComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    custom_id: z.string(),
    placeholder: z.string().exactOptional(),
    min_values: z.int32().nullable().exactOptional(),
    max_values: z.int32().nullable().exactOptional(),
    disabled: z.boolean().exactOptional(),
    default_values: z
      .array(z.xor([RoleSelectDefaultValueResponseSchema, UserSelectDefaultValueResponseSchema]))
      .exactOptional(),
  })
  .openapi({ required: ['type', 'id', 'custom_id'] })
  .openapi('MentionableSelectComponentResponse')

const RoleSelectComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    custom_id: z.string(),
    placeholder: z.string().exactOptional(),
    min_values: z.int32().nullable().exactOptional(),
    max_values: z.int32().nullable().exactOptional(),
    disabled: z.boolean().exactOptional(),
    default_values: z.array(RoleSelectDefaultValueResponseSchema).exactOptional(),
  })
  .openapi({ required: ['type', 'id', 'custom_id'] })
  .openapi('RoleSelectComponentResponse')

const StringSelectOptionResponseSchema = z
  .object({
    label: z.string(),
    value: z.string(),
    description: z.string().exactOptional(),
    emoji: ComponentEmojiResponseSchema.exactOptional(),
    default: z.boolean().exactOptional(),
  })
  .openapi({ required: ['label', 'value'] })
  .openapi('StringSelectOptionResponse')

const StringSelectComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    custom_id: z.string(),
    placeholder: z.string().exactOptional(),
    min_values: z.int32().nullable().exactOptional(),
    max_values: z.int32().nullable().exactOptional(),
    disabled: z.boolean().exactOptional(),
    options: z.array(StringSelectOptionResponseSchema),
  })
  .openapi({ required: ['type', 'id', 'custom_id', 'options'] })
  .openapi('StringSelectComponentResponse')

const TextInputStyleTypesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'SHORT', description: 'Single-line input' }),
    z.literal(2).openapi({ title: 'PARAGRAPH', description: 'Multi-line input' }),
  ])
  .openapi('TextInputStyleTypes')

const TextInputComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    custom_id: z.string(),
    style: TextInputStyleTypesSchema,
    label: z.string().nullable().exactOptional(),
    value: z.string().exactOptional(),
    placeholder: z.string().exactOptional(),
    required: z.boolean().exactOptional(),
    min_length: z.int32().nullable().exactOptional(),
    max_length: z.int32().nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'id', 'custom_id', 'style'] })
  .openapi('TextInputComponentResponse')

const UserSelectComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    custom_id: z.string(),
    placeholder: z.string().exactOptional(),
    min_values: z.int32().nullable().exactOptional(),
    max_values: z.int32().nullable().exactOptional(),
    disabled: z.boolean().exactOptional(),
    default_values: z.array(UserSelectDefaultValueResponseSchema).exactOptional(),
  })
  .openapi({ required: ['type', 'id', 'custom_id'] })
  .openapi('UserSelectComponentResponse')

const ActionRowComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    components: z.array(
      z.xor([
        ButtonComponentResponseSchema,
        ChannelSelectComponentResponseSchema,
        MentionableSelectComponentResponseSchema,
        RoleSelectComponentResponseSchema,
        StringSelectComponentResponseSchema,
        TextInputComponentResponseSchema,
        UserSelectComponentResponseSchema,
      ]),
    ),
  })
  .openapi({ required: ['type', 'id', 'components'] })
  .openapi('ActionRowComponentResponse')

const UnfurledMediaResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    url: z.string(),
    proxy_url: z.string(),
    width: z.int32().nullable().exactOptional(),
    height: z.int32().nullable().exactOptional(),
    content_type: z.string().nullable().exactOptional(),
    attachment_id: SnowflakeTypeSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'url', 'proxy_url'] })
  .openapi('UnfurledMediaResponse')

const FileComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    file: UnfurledMediaResponseSchema,
    name: z.string().nullable().exactOptional(),
    size: z.int32().nullable().exactOptional(),
    spoiler: z.boolean(),
  })
  .openapi({ required: ['type', 'id', 'file', 'spoiler'] })
  .openapi('FileComponentResponse')

const MediaGalleryItemResponseSchema = z
  .object({
    media: UnfurledMediaResponseSchema,
    description: z.string().nullable().exactOptional(),
    spoiler: z.boolean(),
  })
  .openapi({ required: ['media', 'spoiler'] })
  .openapi('MediaGalleryItemResponse')

const MediaGalleryComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    items: z.array(MediaGalleryItemResponseSchema),
  })
  .openapi({ required: ['type', 'id', 'items'] })
  .openapi('MediaGalleryComponentResponse')

const TextDisplayComponentResponseSchema = z
  .object({ type: MessageComponentTypesSchema, id: z.int32(), content: z.string() })
  .openapi({ required: ['type', 'id', 'content'] })
  .openapi('TextDisplayComponentResponse')

const ThumbnailComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    media: UnfurledMediaResponseSchema,
    description: z.string().nullable().exactOptional(),
    spoiler: z.boolean(),
  })
  .openapi({ required: ['type', 'id', 'media', 'spoiler'] })
  .openapi('ThumbnailComponentResponse')

const SectionComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    components: z.array(TextDisplayComponentResponseSchema),
    accessory: z.xor([ButtonComponentResponseSchema, ThumbnailComponentResponseSchema]),
  })
  .openapi({ required: ['type', 'id', 'components', 'accessory'] })
  .openapi('SectionComponentResponse')

const MessageComponentSeparatorSpacingSizeSchema = z
  .xor([
    z.literal(1).openapi({ title: 'SMALL', description: 'Small spacing' }),
    z.literal(2).openapi({ title: 'LARGE', description: 'Large spacing' }),
  ])
  .openapi('MessageComponentSeparatorSpacingSize')

const SeparatorComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    spacing: MessageComponentSeparatorSpacingSizeSchema,
    divider: z.boolean(),
  })
  .openapi({ required: ['type', 'id', 'spacing', 'divider'] })
  .openapi('SeparatorComponentResponse')

const ContainerComponentResponseSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32(),
    accent_color: z.int32().nullable().exactOptional(),
    components: z.array(
      z.xor([
        ActionRowComponentResponseSchema,
        FileComponentResponseSchema,
        MediaGalleryComponentResponseSchema,
        SectionComponentResponseSchema,
        SeparatorComponentResponseSchema,
        TextDisplayComponentResponseSchema,
      ]),
    ),
    spoiler: z.boolean(),
  })
  .openapi({ required: ['type', 'id', 'components', 'spoiler'] })
  .openapi('ContainerComponentResponse')

const StickerTypesSchema = z
  .xor([
    z
      .literal(1)
      .openapi({
        title: 'STANDARD',
        description:
          'an official sticker in a pack, part of Nitro or in a removed purchasable pack',
      }),
    z
      .literal(2)
      .openapi({
        title: 'GUILD',
        description: "a sticker uploaded to a guild for the guild's members",
      }),
  ])
  .openapi('StickerTypes')

const StickerFormatTypesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'PNG' }),
    z.literal(2).openapi({ title: 'APNG' }),
    z.literal(3).openapi({ title: 'LOTTIE' }),
    z.literal(4).openapi({ title: 'GIF' }),
  ])
  .openapi('StickerFormatTypes')

const GuildStickerResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    tags: z.string(),
    type: StickerTypesSchema,
    format_type: z.xor([z.null().nullable(), StickerFormatTypesSchema]).exactOptional(),
    description: z.string().nullable().exactOptional(),
    available: z.boolean(),
    guild_id: SnowflakeTypeSchema,
    user: UserResponseSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'tags', 'type', 'available', 'guild_id'] })
  .openapi('GuildStickerResponse')

const StandardStickerResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    tags: z.string(),
    type: StickerTypesSchema,
    format_type: z.xor([z.null().nullable(), StickerFormatTypesSchema]).exactOptional(),
    description: z.string().nullable().exactOptional(),
    pack_id: SnowflakeTypeSchema,
    sort_value: z.int32(),
  })
  .openapi({ required: ['id', 'name', 'tags', 'type', 'pack_id', 'sort_value'] })
  .openapi('StandardStickerResponse')

const MessageStickerItemResponseSchema = z
  .object({ id: SnowflakeTypeSchema, name: z.string(), format_type: StickerFormatTypesSchema })
  .openapi({ required: ['id', 'name', 'format_type'] })
  .openapi('MessageStickerItemResponse')

const MessageCallResponseSchema = z
  .object({
    ended_timestamp: z.iso.datetime().nullable().exactOptional(),
    participants: z.array(SnowflakeTypeSchema),
  })
  .openapi({ required: ['participants'] })
  .openapi('MessageCallResponse')

const MessageActivityResponseSchema = z.object({}).openapi('MessageActivityResponse')

const BasicApplicationResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    icon: z.string().nullable().exactOptional(),
    description: z.string(),
    type: z.xor([z.null().nullable(), ApplicationTypesSchema]).exactOptional(),
    cover_image: z.string().exactOptional(),
    primary_sku_id: SnowflakeTypeSchema.exactOptional(),
    bot: UserResponseSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'description'] })
  .openapi('BasicApplicationResponse')

const MessageInteractionResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    name: z.string(),
    user: UserResponseSchema.exactOptional(),
    name_localized: z.string().exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'name'] })
  .openapi('MessageInteractionResponse')

const MessageReferenceTypeSchema = z
  .xor([z.literal(0).openapi({ title: 'DEFAULT', description: 'Reference to a message' })])
  .openapi('MessageReferenceType')

const MessageReferenceResponseSchema = z
  .object({
    type: MessageReferenceTypeSchema,
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema.exactOptional(),
    guild_id: SnowflakeTypeSchema.exactOptional(),
  })
  .openapi({ required: ['type', 'channel_id'] })
  .openapi('MessageReferenceResponse')

const VideoQualityModesSchema = z
  .xor([
    z
      .literal(1)
      .openapi({
        title: 'AUTO',
        description: 'Discord chooses the quality for optimal performance',
      }),
    z.literal(2).openapi({ title: 'FULL', description: '720p' }),
  ])
  .openapi('VideoQualityModes')

const ThreadAutoArchiveDurationSchema = z
  .xor([
    z.literal(60).openapi({ title: 'ONE_HOUR', description: 'One hour' }),
    z.literal(1440).openapi({ title: 'ONE_DAY', description: 'One day' }),
    z.literal(4320).openapi({ title: 'THREE_DAY', description: 'Three days' }),
    z.literal(10080).openapi({ title: 'SEVEN_DAY', description: 'Seven days' }),
  ])
  .openapi('ThreadAutoArchiveDuration')

const ThreadMetadataResponseSchema = z
  .object({
    archived: z.boolean(),
    archive_timestamp: z.iso.datetime().nullable().exactOptional(),
    auto_archive_duration: ThreadAutoArchiveDurationSchema,
    locked: z.boolean(),
    create_timestamp: z.iso.datetime().exactOptional(),
    invitable: z.boolean().exactOptional(),
  })
  .openapi({ required: ['archived', 'auto_archive_duration', 'locked'] })
  .openapi('ThreadMetadataResponse')

const GuildMemberResponseSchema = z
  .object({
    avatar: z.string().nullable().exactOptional(),
    avatar_decoration_data: z
      .xor([z.null().nullable(), UserAvatarDecorationResponseSchema])
      .exactOptional(),
    banner: z.string().nullable().exactOptional(),
    communication_disabled_until: z.iso.datetime().nullable().exactOptional(),
    flags: z.int32(),
    joined_at: z.iso.datetime(),
    nick: z.string().nullable().exactOptional(),
    pending: z.boolean(),
    premium_since: z.iso.datetime().nullable().exactOptional(),
    roles: z.array(SnowflakeTypeSchema),
    collectibles: z.xor([z.null().nullable(), UserCollectiblesResponseSchema]).exactOptional(),
    user: UserResponseSchema,
    mute: z.boolean(),
    deaf: z.boolean(),
  })
  .openapi({ required: ['flags', 'joined_at', 'pending', 'roles', 'user', 'mute', 'deaf'] })
  .openapi('GuildMemberResponse')

const ThreadMemberResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
    join_timestamp: z.iso.datetime(),
    flags: z.int32(),
    member: GuildMemberResponseSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'user_id', 'join_timestamp', 'flags'] })
  .openapi('ThreadMemberResponse')

const ThreadResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    last_message_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    flags: z.int32(),
    last_pin_timestamp: z.iso.datetime().nullable().exactOptional(),
    guild_id: SnowflakeTypeSchema,
    name: z.string(),
    parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    rate_limit_per_user: z.int32().exactOptional(),
    bitrate: z.int32().exactOptional(),
    user_limit: z.int32().exactOptional(),
    rtc_region: z.string().nullable().exactOptional(),
    video_quality_mode: VideoQualityModesSchema.exactOptional(),
    permissions: z.string().nullable().exactOptional(),
    owner_id: SnowflakeTypeSchema,
    thread_metadata: ThreadMetadataResponseSchema,
    message_count: z.int32(),
    member_count: z.int32(),
    total_message_sent: z.int32(),
    applied_tags: z.array(SnowflakeTypeSchema).exactOptional(),
    member: ThreadMemberResponseSchema.exactOptional(),
  })
  .openapi({
    required: [
      'id',
      'type',
      'flags',
      'guild_id',
      'name',
      'owner_id',
      'thread_metadata',
      'message_count',
      'member_count',
      'total_message_sent',
    ],
  })
  .openapi('ThreadResponse')

const MessageMentionChannelResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    type: ChannelTypesSchema,
    guild_id: SnowflakeTypeSchema,
  })
  .openapi({ required: ['id', 'name', 'type', 'guild_id'] })
  .openapi('MessageMentionChannelResponse')

const MessageRoleSubscriptionDataResponseSchema = z
  .object({
    role_subscription_listing_id: SnowflakeTypeSchema,
    tier_name: z.string(),
    total_months_subscribed: z.int32(),
    is_renewal: z.boolean(),
  })
  .openapi({
    required: [
      'role_subscription_listing_id',
      'tier_name',
      'total_months_subscribed',
      'is_renewal',
    ],
  })
  .openapi('MessageRoleSubscriptionDataResponse')

const PurchaseTypeSchema = z
  .xor([z.literal(0).openapi({ title: 'GUILD_PRODUCT' })])
  .openapi('PurchaseType')

const GuildProductPurchaseResponseSchema = z
  .object({ listing_id: SnowflakeTypeSchema, product_name: z.string() })
  .openapi({ required: ['listing_id', 'product_name'] })
  .openapi('GuildProductPurchaseResponse')

const PurchaseNotificationResponseSchema = z
  .object({
    type: PurchaseTypeSchema,
    guild_product_purchase: GuildProductPurchaseResponseSchema.exactOptional(),
  })
  .openapi({ required: ['type'] })
  .openapi('PurchaseNotificationResponse')

const BasicGuildMemberResponseSchema = z
  .object({
    avatar: z.string().nullable().exactOptional(),
    avatar_decoration_data: z
      .xor([z.null().nullable(), UserAvatarDecorationResponseSchema])
      .exactOptional(),
    banner: z.string().nullable().exactOptional(),
    communication_disabled_until: z.iso.datetime().nullable().exactOptional(),
    flags: z.int32(),
    joined_at: z.iso.datetime(),
    nick: z.string().nullable().exactOptional(),
    pending: z.boolean(),
    premium_since: z.iso.datetime().nullable().exactOptional(),
    roles: z.array(SnowflakeTypeSchema),
    collectibles: z.xor([z.null().nullable(), UserCollectiblesResponseSchema]).exactOptional(),
  })
  .openapi({ required: ['flags', 'joined_at', 'pending', 'roles'] })
  .openapi('BasicGuildMemberResponse')

const ChannelPermissionOverwritesSchema = z
  .xor([z.literal(0).openapi({ title: 'ROLE' }), z.literal(1).openapi({ title: 'MEMBER' })])
  .openapi('ChannelPermissionOverwrites')

const ChannelPermissionOverwriteResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: ChannelPermissionOverwritesSchema,
    allow: z.string(),
    deny: z.string(),
  })
  .openapi({ required: ['id', 'type', 'allow', 'deny'] })
  .openapi('ChannelPermissionOverwriteResponse')

const ForumTagResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    moderated: z.boolean(),
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().nullable().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'moderated'] })
  .openapi('ForumTagResponse')

const DefaultReactionEmojiResponseSchema = z
  .object({
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().nullable().exactOptional(),
  })
  .openapi({ required: [] })
  .openapi('DefaultReactionEmojiResponse')

const ThreadSortOrderSchema = z
  .xor([
    z.literal(0).openapi({ title: 'LATEST_ACTIVITY', description: 'Sort forum posts by activity' }),
    z
      .literal(1)
      .openapi({
        title: 'CREATION_DATE',
        description: 'Sort forum posts by creation time (from most recent to oldest)',
      }),
  ])
  .openapi('ThreadSortOrder')

const ForumLayoutSchema = z
  .xor([
    z
      .literal(0)
      .openapi({ title: 'DEFAULT', description: 'No default has been set for forum channel' }),
    z.literal(1).openapi({ title: 'LIST', description: 'Display posts as a list' }),
    z.literal(2).openapi({ title: 'GRID', description: 'Display posts as a collection of tiles' }),
  ])
  .openapi('ForumLayout')

const ThreadSearchTagSettingSchema = z
  .xor([
    z
      .literal('match_all')
      .openapi({
        title: 'MATCH_ALL',
        description: 'The thread tags must contain all tags in the search query',
      }),
    z
      .literal('match_some')
      .openapi({
        title: 'MATCH_SOME',
        description: 'The thread tags must contain at least one of tags in the search query',
      }),
  ])
  .openapi('ThreadSearchTagSetting')

const GuildChannelResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    last_message_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    flags: z.int32(),
    last_pin_timestamp: z.iso.datetime().nullable().exactOptional(),
    guild_id: SnowflakeTypeSchema,
    name: z.string(),
    parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    rate_limit_per_user: z.int32().exactOptional(),
    bitrate: z.int32().exactOptional(),
    user_limit: z.int32().exactOptional(),
    rtc_region: z.string().nullable().exactOptional(),
    video_quality_mode: VideoQualityModesSchema.exactOptional(),
    permissions: z.string().nullable().exactOptional(),
    topic: z.string().nullable().exactOptional(),
    default_auto_archive_duration: ThreadAutoArchiveDurationSchema.exactOptional(),
    default_thread_rate_limit_per_user: z.int32().exactOptional(),
    position: z.int32(),
    permission_overwrites: z.array(ChannelPermissionOverwriteResponseSchema).exactOptional(),
    nsfw: z.boolean().exactOptional(),
    available_tags: z.array(ForumTagResponseSchema).exactOptional(),
    default_reaction_emoji: z
      .xor([z.null().nullable(), DefaultReactionEmojiResponseSchema])
      .exactOptional(),
    default_sort_order: z.xor([z.null().nullable(), ThreadSortOrderSchema]).exactOptional(),
    default_forum_layout: z.xor([z.null().nullable(), ForumLayoutSchema]).exactOptional(),
    default_tag_setting: z.xor([z.null().nullable(), ThreadSearchTagSettingSchema]).exactOptional(),
    hd_streaming_until: z.iso.datetime().exactOptional(),
    hd_streaming_buyer_id: SnowflakeTypeSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'flags', 'guild_id', 'name', 'position'] })
  .openapi('GuildChannelResponse')

const PrivateChannelResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    last_message_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    flags: z.int32(),
    last_pin_timestamp: z.iso.datetime().nullable().exactOptional(),
    recipients: z.array(UserResponseSchema),
  })
  .openapi({ required: ['id', 'type', 'flags', 'recipients'] })
  .openapi('PrivateChannelResponse')

const PrivateGroupChannelResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    last_message_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    flags: z.int32(),
    last_pin_timestamp: z.iso.datetime().nullable().exactOptional(),
    recipients: z.array(UserResponseSchema),
    name: z.string().nullable().exactOptional(),
    icon: z.string().nullable().exactOptional(),
    owner_id: SnowflakeTypeSchema,
    managed: z.boolean().exactOptional(),
    application_id: SnowflakeTypeSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'flags', 'recipients', 'owner_id'] })
  .openapi('PrivateGroupChannelResponse')

const GuildRoleColorsResponseSchema = z
  .object({
    primary_color: z.int32(),
    secondary_color: z.int32().nullable().exactOptional(),
    tertiary_color: z.int32().nullable().exactOptional(),
  })
  .openapi({ required: ['primary_color'] })
  .openapi('GuildRoleColorsResponse')

const GuildRoleTagsResponseSchema = z
  .object({
    premium_subscriber: z.null().nullable().exactOptional(),
    bot_id: SnowflakeTypeSchema.exactOptional(),
    integration_id: SnowflakeTypeSchema.exactOptional(),
    subscription_listing_id: SnowflakeTypeSchema.exactOptional(),
    available_for_purchase: z.null().nullable().exactOptional(),
    guild_connections: z.null().nullable().exactOptional(),
  })
  .openapi({ required: [] })
  .openapi('GuildRoleTagsResponse')

const GuildRoleResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    description: z.string().nullable().exactOptional(),
    permissions: z.string(),
    position: z.int32(),
    color: z.int32(),
    colors: GuildRoleColorsResponseSchema,
    hoist: z.boolean(),
    managed: z.boolean(),
    mentionable: z.boolean(),
    icon: z.string().nullable().exactOptional(),
    unicode_emoji: z.string().nullable().exactOptional(),
    tags: GuildRoleTagsResponseSchema.exactOptional(),
    flags: z.int32(),
  })
  .openapi({
    required: [
      'id',
      'name',
      'permissions',
      'position',
      'color',
      'colors',
      'hoist',
      'managed',
      'mentionable',
      'flags',
    ],
  })
  .openapi('GuildRoleResponse')

const ResolvedObjectsResponseSchema = z
  .object({
    users: z.record(z.string(), UserResponseSchema).nullable().exactOptional(),
    members: z.record(z.string(), BasicGuildMemberResponseSchema).nullable().exactOptional(),
    channels: z
      .record(
        z.string(),
        z.xor([
          GuildChannelResponseSchema,
          PrivateChannelResponseSchema,
          PrivateGroupChannelResponseSchema,
          ThreadResponseSchema,
        ]),
      )
      .nullable()
      .exactOptional(),
    roles: z.record(z.string(), GuildRoleResponseSchema).nullable().exactOptional(),
  })
  .openapi({ required: [] })
  .openapi('ResolvedObjectsResponse')

const MessageReactionEmojiResponseSchema = z
  .object({
    id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    name: z.string().nullable().exactOptional(),
    animated: z.boolean().exactOptional(),
  })
  .openapi({ required: [] })
  .openapi('MessageReactionEmojiResponse')

const PollMediaResponseSchema = z
  .object({
    text: z.string().exactOptional(),
    emoji: MessageReactionEmojiResponseSchema.exactOptional(),
  })
  .openapi({ required: [] })
  .openapi('PollMediaResponse')

const PollAnswerResponseSchema = z
  .object({ answer_id: z.int32(), poll_media: PollMediaResponseSchema })
  .openapi({ required: ['answer_id', 'poll_media'] })
  .openapi('PollAnswerResponse')

const PollLayoutTypesSchema = z.any().openapi('PollLayoutTypes')

const PollResultsEntryResponseSchema = z
  .object({ id: z.int32(), count: z.int32(), me_voted: z.boolean() })
  .openapi({ required: ['id', 'count', 'me_voted'] })
  .openapi('PollResultsEntryResponse')

const PollResultsResponseSchema = z
  .object({ answer_counts: z.array(PollResultsEntryResponseSchema), is_finalized: z.boolean() })
  .openapi({ required: ['answer_counts', 'is_finalized'] })
  .openapi('PollResultsResponse')

const PollResponseSchema = z
  .object({
    question: PollMediaResponseSchema,
    answers: z.array(PollAnswerResponseSchema),
    expiry: z.iso.datetime(),
    allow_multiselect: z.boolean(),
    layout_type: PollLayoutTypesSchema,
    results: PollResultsResponseSchema,
  })
  .openapi({
    required: ['question', 'answers', 'expiry', 'allow_multiselect', 'layout_type', 'results'],
  })
  .openapi('PollResponse')

const MessageShareCustomUserThemeBaseThemeSchema = z
  .xor([
    z.literal(0).openapi({ title: 'UNSET', description: 'No base theme' }),
    z.literal(1).openapi({ title: 'DARK', description: 'Dark base theme' }),
    z.literal(2).openapi({ title: 'LIGHT', description: 'Light base theme' }),
    z.literal(3).openapi({ title: 'DARKER', description: 'Darker base theme' }),
    z.literal(4).openapi({ title: 'MIDNIGHT', description: 'Midnight base theme' }),
  ])
  .openapi('MessageShareCustomUserThemeBaseTheme')

const CustomClientThemeResponseSchema = z
  .object({
    colors: z.array(z.string()),
    gradient_angle: z.int32(),
    base_mix: z.int32(),
    base_theme: MessageShareCustomUserThemeBaseThemeSchema,
  })
  .openapi({ required: ['colors', 'gradient_angle', 'base_mix', 'base_theme'] })
  .openapi('CustomClientThemeResponse')

const ApplicationCommandInteractionMetadataResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    user: UserResponseSchema.exactOptional(),
    authorizing_integration_owners: z.record(z.string(), SnowflakeTypeSchema),
    original_response_message_id: SnowflakeTypeSchema.exactOptional(),
    target_user: UserResponseSchema.exactOptional(),
    target_message_id: SnowflakeTypeSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'authorizing_integration_owners'] })
  .openapi('ApplicationCommandInteractionMetadataResponse')

const MessageComponentInteractionMetadataResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    user: UserResponseSchema.exactOptional(),
    authorizing_integration_owners: z.record(z.string(), SnowflakeTypeSchema),
    original_response_message_id: SnowflakeTypeSchema.exactOptional(),
    interacted_message_id: SnowflakeTypeSchema,
  })
  .openapi({ required: ['id', 'type', 'authorizing_integration_owners', 'interacted_message_id'] })
  .openapi('MessageComponentInteractionMetadataResponse')

const ModalSubmitInteractionMetadataResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    user: UserResponseSchema.exactOptional(),
    authorizing_integration_owners: z.record(z.string(), SnowflakeTypeSchema),
    original_response_message_id: SnowflakeTypeSchema.exactOptional(),
    triggering_interaction_metadata: z.xor([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
    ]),
  })
  .openapi({
    required: ['id', 'type', 'authorizing_integration_owners', 'triggering_interaction_metadata'],
  })
  .openapi('ModalSubmitInteractionMetadataResponse')

const MinimalContentMessageResponseSchema = z
  .object({
    type: MessageTypeSchema,
    content: z.string(),
    mentions: z.array(UserResponseSchema),
    mention_roles: z.array(SnowflakeTypeSchema),
    attachments: z.array(MessageAttachmentResponseSchema),
    embeds: z.array(MessageEmbedResponseSchema),
    timestamp: z.iso.datetime(),
    edited_timestamp: z.iso.datetime().nullable().exactOptional(),
    flags: z.int32(),
    components: z.array(
      z.xor([
        ActionRowComponentResponseSchema,
        ContainerComponentResponseSchema,
        FileComponentResponseSchema,
        MediaGalleryComponentResponseSchema,
        SectionComponentResponseSchema,
        SeparatorComponentResponseSchema,
        TextDisplayComponentResponseSchema,
      ]),
    ),
    stickers: z
      .array(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]))
      .exactOptional(),
    sticker_items: z.array(MessageStickerItemResponseSchema).exactOptional(),
  })
  .openapi({
    required: [
      'type',
      'content',
      'mentions',
      'mention_roles',
      'attachments',
      'embeds',
      'timestamp',
      'flags',
      'components',
    ],
  })
  .openapi('MinimalContentMessageResponse')

const MessageSnapshotResponseSchema = z
  .object({ message: MinimalContentMessageResponseSchema })
  .openapi({ required: ['message'] })
  .openapi('MessageSnapshotResponse')

const MessageReactionCountDetailsResponseSchema = z
  .object({ burst: z.int32(), normal: z.int32() })
  .openapi({ required: ['burst', 'normal'] })
  .openapi('MessageReactionCountDetailsResponse')

const MessageReactionResponseSchema = z
  .object({
    emoji: MessageReactionEmojiResponseSchema,
    count: z.int32(),
    count_details: MessageReactionCountDetailsResponseSchema,
    burst_colors: z.array(z.string()),
    me_burst: z.boolean(),
    me: z.boolean(),
  })
  .openapi({ required: ['emoji', 'count', 'count_details', 'burst_colors', 'me_burst', 'me'] })
  .openapi('MessageReactionResponse')

const BasicMessageResponseSchema = z
  .object({
    type: MessageTypeSchema,
    content: z.string(),
    mentions: z.array(UserResponseSchema),
    mention_roles: z.array(SnowflakeTypeSchema),
    attachments: z.array(MessageAttachmentResponseSchema),
    embeds: z.array(MessageEmbedResponseSchema),
    timestamp: z.iso.datetime(),
    edited_timestamp: z.iso.datetime().nullable().exactOptional(),
    flags: z.int32(),
    components: z.array(
      z.xor([
        ActionRowComponentResponseSchema,
        ContainerComponentResponseSchema,
        FileComponentResponseSchema,
        MediaGalleryComponentResponseSchema,
        SectionComponentResponseSchema,
        SeparatorComponentResponseSchema,
        TextDisplayComponentResponseSchema,
      ]),
    ),
    stickers: z
      .array(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]))
      .exactOptional(),
    sticker_items: z.array(MessageStickerItemResponseSchema).exactOptional(),
    id: SnowflakeTypeSchema,
    channel_id: SnowflakeTypeSchema,
    author: UserResponseSchema,
    pinned: z.boolean(),
    mention_everyone: z.boolean(),
    tts: z.boolean(),
    call: MessageCallResponseSchema.exactOptional(),
    activity: MessageActivityResponseSchema.exactOptional(),
    application: BasicApplicationResponseSchema.exactOptional(),
    application_id: SnowflakeTypeSchema.exactOptional(),
    interaction: MessageInteractionResponseSchema.exactOptional(),
    nonce: z
      .xor([
        z.int64().min(-9223372036854776000n).max(9223372036854776000n),
        z.string().max(25),
        z.null().nullable(),
      ])
      .exactOptional(),
    webhook_id: SnowflakeTypeSchema.exactOptional(),
    message_reference: MessageReferenceResponseSchema.exactOptional(),
    thread: ThreadResponseSchema.exactOptional(),
    mention_channels: z
      .array(z.xor([z.null().nullable(), MessageMentionChannelResponseSchema]))
      .exactOptional(),
    role_subscription_data: MessageRoleSubscriptionDataResponseSchema.exactOptional(),
    purchase_notification: PurchaseNotificationResponseSchema.exactOptional(),
    position: z.int32().exactOptional(),
    resolved: ResolvedObjectsResponseSchema.exactOptional(),
    poll: PollResponseSchema.exactOptional(),
    shared_client_theme: z
      .xor([z.null().nullable(), CustomClientThemeResponseSchema])
      .exactOptional(),
    interaction_metadata: z
      .xor([
        ApplicationCommandInteractionMetadataResponseSchema,
        MessageComponentInteractionMetadataResponseSchema,
        ModalSubmitInteractionMetadataResponseSchema,
      ])
      .exactOptional(),
    message_snapshots: z.array(MessageSnapshotResponseSchema).exactOptional(),
  })
  .openapi({
    required: [
      'type',
      'content',
      'mentions',
      'mention_roles',
      'attachments',
      'embeds',
      'timestamp',
      'flags',
      'components',
      'id',
      'channel_id',
      'author',
      'pinned',
      'mention_everyone',
      'tts',
    ],
  })
  .openapi('BasicMessageResponse')

type MessageResponseType = {
  type: z.infer<typeof MessageTypeSchema>
  content: string
  mentions: z.infer<typeof UserResponseSchema>[]
  mention_roles: z.infer<typeof SnowflakeTypeSchema>[]
  attachments: z.infer<typeof MessageAttachmentResponseSchema>[]
  embeds: z.infer<typeof MessageEmbedResponseSchema>[]
  timestamp: string
  edited_timestamp?: string | null
  flags: number
  components: (
    | z.infer<typeof ActionRowComponentResponseSchema>
    | z.infer<typeof ContainerComponentResponseSchema>
    | z.infer<typeof FileComponentResponseSchema>
    | z.infer<typeof MediaGalleryComponentResponseSchema>
    | z.infer<typeof SectionComponentResponseSchema>
    | z.infer<typeof SeparatorComponentResponseSchema>
    | z.infer<typeof TextDisplayComponentResponseSchema>
  )[]
  stickers?: (
    | z.infer<typeof GuildStickerResponseSchema>
    | z.infer<typeof StandardStickerResponseSchema>
  )[]
  sticker_items?: z.infer<typeof MessageStickerItemResponseSchema>[]
  id: z.infer<typeof SnowflakeTypeSchema>
  channel_id: z.infer<typeof SnowflakeTypeSchema>
  author: z.infer<typeof UserResponseSchema>
  pinned: boolean
  mention_everyone: boolean
  tts: boolean
  call?: z.infer<typeof MessageCallResponseSchema>
  activity?: z.infer<typeof MessageActivityResponseSchema>
  application?: z.infer<typeof BasicApplicationResponseSchema>
  application_id?: z.infer<typeof SnowflakeTypeSchema>
  interaction?: z.infer<typeof MessageInteractionResponseSchema>
  nonce?: number | string | ({ [key: string]: unknown } | null)
  webhook_id?: z.infer<typeof SnowflakeTypeSchema>
  message_reference?: z.infer<typeof MessageReferenceResponseSchema>
  thread?: z.infer<typeof ThreadResponseSchema>
  mention_channels?: (
    | ({ [key: string]: unknown } | null)
    | z.infer<typeof MessageMentionChannelResponseSchema>
  )[]
  role_subscription_data?: z.infer<typeof MessageRoleSubscriptionDataResponseSchema>
  purchase_notification?: z.infer<typeof PurchaseNotificationResponseSchema>
  position?: number
  resolved?: z.infer<typeof ResolvedObjectsResponseSchema>
  poll?: z.infer<typeof PollResponseSchema>
  shared_client_theme?:
    | ({ [key: string]: unknown } | null)
    | z.infer<typeof CustomClientThemeResponseSchema>
  interaction_metadata?:
    | z.infer<typeof ApplicationCommandInteractionMetadataResponseSchema>
    | z.infer<typeof MessageComponentInteractionMetadataResponseSchema>
    | z.infer<typeof ModalSubmitInteractionMetadataResponseSchema>
  message_snapshots?: z.infer<typeof MessageSnapshotResponseSchema>[]
  reactions?: z.infer<typeof MessageReactionResponseSchema>[]
  referenced_message?:
    | ({ [key: string]: unknown } | null)
    | z.infer<typeof BasicMessageResponseSchema>
}

const SearchCursorTypeSchema = z
  .xor([
    z.literal('score').openapi({ title: 'SCORE' }),
    z.literal('timestamp').openapi({ title: 'TIMESTAMP' }),
  ])
  .openapi('SearchCursorType')

const ScoreCursorInnerScoreCursorSchema = z
  .object({ score: z.number().nullable().exactOptional(), timestamp: SnowflakeTypeSchema })
  .openapi({ required: ['timestamp'] })
  .openapi('ScoreCursorInnerScoreCursor')

type ScoreCursorType = {
  type: z.infer<typeof SearchCursorTypeSchema>
  score?: ({ [key: string]: unknown } | null) | z.infer<typeof ScoreCursorInnerScoreCursorSchema>
}

const ErrorSchema = z
  .object({
    code: z.int().openapi({ description: 'Discord internal error code. See error code reference' }),
    message: z.string().openapi({ description: 'Human-readable error message' }),
  })
  .openapi({
    description: 'A single error, either for an API response or a specific field.',
    required: ['code', 'message'],
  })
  .openapi('Error')

const InnerErrorsSchema = z
  .strictObject({
    _errors: z.array(ErrorSchema).openapi({ description: 'The list of errors for this field' }),
  })
  .openapi({ required: ['_errors'] })
  .openapi('InnerErrors')

type ErrorDetailsType = { [key: string]: ErrorDetailsType } | z.infer<typeof InnerErrorsSchema>

const AccountResponseSchema = z
  .object({ id: z.string(), name: z.string().nullable().exactOptional() })
  .openapi({ required: ['id'] })
  .openapi('AccountResponse')

const ComponentEmojiForRequestSchema = z
  .object({
    id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    name: z.string().max(32),
  })
  .openapi({ required: ['name'] })
  .openapi('ComponentEmojiForRequest')

const ButtonComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100).nullable().exactOptional(),
    style: ButtonStyleTypesSchema,
    label: z.string().max(80).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    url: z.url().max(512).nullable().exactOptional(),
    sku_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji: z.xor([z.null().nullable(), ComponentEmojiForRequestSchema]).exactOptional(),
  })
  .openapi({ required: ['type', 'style'] })
  .openapi('ButtonComponentForMessageRequest')

const ChannelSelectDefaultValueSchema = z
  .object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema })
  .openapi({ required: ['type', 'id'] })
  .openapi('ChannelSelectDefaultValue')

const ChannelSelectComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    placeholder: z.string().max(150).nullable().exactOptional(),
    min_values: z.int().min(0).max(25).nullable().exactOptional(),
    max_values: z.int().min(1).max(25).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    default_values: z.array(ChannelSelectDefaultValueSchema).max(25).nullable().exactOptional(),
    channel_types: z.array(ChannelTypesSchema).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'custom_id'] })
  .openapi('ChannelSelectComponentForMessageRequest')

const RoleSelectDefaultValueSchema = z
  .object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema })
  .openapi({ required: ['type', 'id'] })
  .openapi('RoleSelectDefaultValue')

const UserSelectDefaultValueSchema = z
  .object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema })
  .openapi({ required: ['type', 'id'] })
  .openapi('UserSelectDefaultValue')

const MentionableSelectComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    placeholder: z.string().max(150).nullable().exactOptional(),
    min_values: z.int().min(0).max(25).nullable().exactOptional(),
    max_values: z.int().min(1).max(25).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    default_values: z
      .array(z.xor([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema]))
      .max(25)
      .nullable()
      .exactOptional(),
  })
  .openapi({ required: ['type', 'custom_id'] })
  .openapi('MentionableSelectComponentForMessageRequest')

const RoleSelectComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    placeholder: z.string().max(150).nullable().exactOptional(),
    min_values: z.int().min(0).max(25).nullable().exactOptional(),
    max_values: z.int().min(1).max(25).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    default_values: z.array(RoleSelectDefaultValueSchema).max(25).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'custom_id'] })
  .openapi('RoleSelectComponentForMessageRequest')

const StringSelectOptionForRequestSchema = z
  .object({
    label: z.string().min(1).max(100),
    value: z.string().min(1).max(100),
    description: z.string().max(100).nullable().exactOptional(),
    default: z.boolean().nullable().exactOptional(),
    emoji: z.xor([z.null().nullable(), ComponentEmojiForRequestSchema]).exactOptional(),
  })
  .openapi({ required: ['label', 'value'] })
  .openapi('StringSelectOptionForRequest')

const StringSelectComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    placeholder: z.string().max(150).nullable().exactOptional(),
    min_values: z.int().min(0).max(25).nullable().exactOptional(),
    max_values: z.int().min(1).max(25).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    options: z.array(StringSelectOptionForRequestSchema).min(1).max(25),
  })
  .openapi({ required: ['type', 'custom_id', 'options'] })
  .openapi('StringSelectComponentForMessageRequest')

const UserSelectComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    placeholder: z.string().max(150).nullable().exactOptional(),
    min_values: z.int().min(0).max(25).nullable().exactOptional(),
    max_values: z.int().min(1).max(25).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    default_values: z.array(UserSelectDefaultValueSchema).max(25).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'custom_id'] })
  .openapi('UserSelectComponentForMessageRequest')

const ActionRowComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    components: z
      .array(
        z.xor([
          ButtonComponentForMessageRequestSchema,
          ChannelSelectComponentForMessageRequestSchema,
          MentionableSelectComponentForMessageRequestSchema,
          RoleSelectComponentForMessageRequestSchema,
          StringSelectComponentForMessageRequestSchema,
          UserSelectComponentForMessageRequestSchema,
        ]),
      )
      .min(1)
      .max(5),
  })
  .openapi({ required: ['type', 'components'] })
  .openapi('ActionRowComponentForMessageRequest')

const TextInputComponentForModalRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    style: TextInputStyleTypesSchema,
    label: z.string().min(1).max(45).nullable().exactOptional(),
    value: z.string().max(4000).nullable().exactOptional(),
    placeholder: z.string().max(100).nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    min_length: z.int().min(0).max(4000).nullable().exactOptional(),
    max_length: z.int().min(1).max(4000).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'custom_id', 'style'] })
  .openapi('TextInputComponentForModalRequest')

const ActionRowComponentForModalRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    components: z.array(TextInputComponentForModalRequestSchema).min(1).max(5),
  })
  .openapi({ required: ['type', 'components'] })
  .openapi('ActionRowComponentForModalRequest')

const AttachmentResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    filename: z.string(),
    size: z.int32(),
    url: z.url(),
    proxy_url: z.url(),
    width: z.int32().exactOptional(),
    height: z.int32().exactOptional(),
    duration_secs: z.number().exactOptional(),
    waveform: z.string().exactOptional(),
    description: z.string().exactOptional(),
    content_type: z.string().exactOptional(),
    ephemeral: z.boolean().exactOptional(),
    title: z.string().nullable().exactOptional(),
    application: ApplicationResponseSchema.exactOptional(),
    clip_created_at: z.iso.datetime().exactOptional(),
    clip_participants: z.array(UserResponseSchema).exactOptional(),
  })
  .openapi({ required: ['id', 'filename', 'size', 'url', 'proxy_url'] })
  .openapi('AttachmentResponse')

const ActivitiesAttachmentResponseSchema = z
  .object({ attachment: AttachmentResponseSchema })
  .openapi({ required: ['attachment'] })
  .openapi('ActivitiesAttachmentResponse')

const AfkTimeoutsSchema = z
  .xor([
    z.literal(60).openapi({ title: 'ONE_MINUTE' }),
    z.literal(300).openapi({ title: 'FIVE_MINUTES' }),
    z.literal(900).openapi({ title: 'FIFTEEN_MINUTES' }),
    z.literal(1800).openapi({ title: 'THIRTY_MINUTES' }),
    z.literal(3600).openapi({ title: 'ONE_HOUR' }),
  ])
  .openapi('AfkTimeouts')

const AllowedMentionTypesSchema = z
  .xor([
    z.literal('users').openapi({ title: 'USERS', description: 'Controls role mentions' }),
    z.literal('roles').openapi({ title: 'ROLES', description: 'Controls user mentions' }),
    z
      .literal('everyone')
      .openapi({ title: 'EVERYONE', description: 'Controls @everyone and @here mentions' }),
  ])
  .openapi('AllowedMentionTypes')

const ApplicationCommandOptionTypeSchema = z
  .xor([
    z
      .literal(1)
      .openapi({ title: 'SUB_COMMAND', description: 'A sub-action within a command or group' }),
    z.literal(2).openapi({ title: 'SUB_COMMAND_GROUP', description: 'A group of subcommands' }),
    z.literal(3).openapi({ title: 'STRING', description: 'A string option' }),
    z
      .literal(4)
      .openapi({
        title: 'INTEGER',
        description: 'An integer option. Any integer between -2^53 and 2^53 is a valid value',
      }),
    z.literal(5).openapi({ title: 'BOOLEAN', description: 'A boolean option' }),
    z
      .literal(6)
      .openapi({ title: 'USER', description: 'A snowflake option that represents a User' }),
    z
      .literal(7)
      .openapi({
        title: 'CHANNEL',
        description:
          'A snowflake option that represents a Channel. Includes all channel types and categories',
      }),
    z
      .literal(8)
      .openapi({ title: 'ROLE', description: 'A snowflake option that represents a Role' }),
    z
      .literal(9)
      .openapi({
        title: 'MENTIONABLE',
        description: 'A snowflake option that represents anything you can mention',
      }),
    z
      .literal(10)
      .openapi({
        title: 'NUMBER',
        description: 'A number option. Any double between -2^53 and 2^53 is a valid value',
      }),
    z.literal(11).openapi({ title: 'ATTACHMENT', description: 'An attachment option' }),
  ])
  .openapi('ApplicationCommandOptionType')

const ApplicationCommandAttachmentOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandAttachmentOption')

const ApplicationCommandAttachmentOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandAttachmentOptionResponse')

const ApplicationCommandOptionIntegerChoiceSchema = z
  .object({
    name: z.string().min(1).max(100),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    value: Int53TypeSchema,
  })
  .openapi({ required: ['name', 'value'] })
  .openapi('ApplicationCommandOptionIntegerChoice')

const InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema = z
  .object({
    choices: z
      .array(z.xor([z.null().nullable(), ApplicationCommandOptionIntegerChoiceSchema]))
      .max(25)
      .nullable()
      .exactOptional(),
  })
  .openapi('InteractionApplicationCommandAutocompleteCallbackIntegerData')

const ApplicationCommandOptionNumberChoiceSchema = z
  .object({
    name: z.string().min(1).max(100),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    value: z.number(),
  })
  .openapi({ required: ['name', 'value'] })
  .openapi('ApplicationCommandOptionNumberChoice')

const InteractionApplicationCommandAutocompleteCallbackNumberDataSchema = z
  .object({
    choices: z
      .array(z.xor([z.null().nullable(), ApplicationCommandOptionNumberChoiceSchema]))
      .max(25)
      .nullable()
      .exactOptional(),
  })
  .openapi('InteractionApplicationCommandAutocompleteCallbackNumberData')

const ApplicationCommandOptionStringChoiceSchema = z
  .object({
    name: z.string().min(1).max(100),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    value: z.string().max(6000),
  })
  .openapi({ required: ['name', 'value'] })
  .openapi('ApplicationCommandOptionStringChoice')

const InteractionApplicationCommandAutocompleteCallbackStringDataSchema = z
  .object({
    choices: z
      .array(z.xor([z.null().nullable(), ApplicationCommandOptionStringChoiceSchema]))
      .max(25)
      .nullable()
      .exactOptional(),
  })
  .openapi('InteractionApplicationCommandAutocompleteCallbackStringData')

const ApplicationCommandAutocompleteCallbackRequestSchema = z
  .object({
    type: InteractionCallbackTypesSchema,
    data: z
      .union([
        InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema,
        InteractionApplicationCommandAutocompleteCallbackNumberDataSchema,
        InteractionApplicationCommandAutocompleteCallbackStringDataSchema,
      ])
      .openapi({ 'x-discord-union': 'oneOf' }),
  })
  .openapi({ required: ['type', 'data'] })
  .openapi('ApplicationCommandAutocompleteCallbackRequest')

const ApplicationCommandBooleanOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandBooleanOption')

const ApplicationCommandBooleanOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandBooleanOptionResponse')

const ApplicationCommandChannelOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
    channel_types: z.array(ChannelTypesSchema).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandChannelOption')

const ApplicationCommandChannelOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
    channel_types: z.array(ChannelTypesSchema).exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandChannelOptionResponse')

const ApplicationCommandIntegerOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
    autocomplete: z.boolean().nullable().exactOptional(),
    choices: z
      .array(ApplicationCommandOptionIntegerChoiceSchema)
      .max(25)
      .nullable()
      .exactOptional(),
    min_value: z.xor([z.null().nullable(), Int53TypeSchema]).exactOptional(),
    max_value: z.xor([z.null().nullable(), Int53TypeSchema]).exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandIntegerOption')

const ApplicationCommandMentionableOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandMentionableOption')

const ApplicationCommandNumberOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
    autocomplete: z.boolean().nullable().exactOptional(),
    choices: z.array(ApplicationCommandOptionNumberChoiceSchema).max(25).nullable().exactOptional(),
    min_value: z.number().nullable().exactOptional(),
    max_value: z.number().nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandNumberOption')

const ApplicationCommandRoleOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandRoleOption')

const ApplicationCommandStringOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
    autocomplete: z.boolean().nullable().exactOptional(),
    min_length: z.int().min(0).max(6000).nullable().exactOptional(),
    max_length: z.int().min(1).max(6000).nullable().exactOptional(),
    choices: z.array(ApplicationCommandOptionStringChoiceSchema).max(25).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandStringOption')

const ApplicationCommandUserOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandUserOption')

const ApplicationCommandSubcommandOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
    options: z
      .array(
        z.xor([
          ApplicationCommandAttachmentOptionSchema,
          ApplicationCommandBooleanOptionSchema,
          ApplicationCommandChannelOptionSchema,
          ApplicationCommandIntegerOptionSchema,
          ApplicationCommandMentionableOptionSchema,
          ApplicationCommandNumberOptionSchema,
          ApplicationCommandRoleOptionSchema,
          ApplicationCommandStringOptionSchema,
          ApplicationCommandUserOptionSchema,
        ]),
      )
      .max(25)
      .nullable()
      .exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandSubcommandOption')

const ApplicationCommandSubcommandGroupOptionSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().min(1).max(100),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    required: z.boolean().nullable().exactOptional(),
    options: z.array(ApplicationCommandSubcommandOptionSchema).max(25).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandSubcommandGroupOption')

const InteractionContextTypeSchema = z
  .xor([
    z
      .literal(0)
      .openapi({ title: 'GUILD', description: 'This command can be used within a Guild.' }),
    z
      .literal(1)
      .openapi({
        title: 'BOT_DM',
        description: "This command can be used within a DM with this application's bot.",
      }),
    z
      .literal(2)
      .openapi({
        title: 'PRIVATE_CHANNEL',
        description: 'This command can be used within DMs and Group DMs with users.',
      }),
  ])
  .openapi('InteractionContextType')

const ApplicationIntegrationTypeSchema = z
  .xor([
    z.literal(0).openapi({ title: 'GUILD_INSTALL', description: 'For Guild install.' }),
    z.literal(1).openapi({ title: 'USER_INSTALL', description: 'For User install.' }),
  ])
  .openapi('ApplicationIntegrationType')

const ApplicationCommandHandlerSchema = z.any().openapi('ApplicationCommandHandler')

const ApplicationCommandTypeSchema = z
  .xor([
    z
      .literal(1)
      .openapi({
        title: 'CHAT',
        description: 'Slash commands; a text-based command that shows up when a user types /',
      }),
    z
      .literal(2)
      .openapi({
        title: 'USER',
        description: 'A UI-based command that shows up when you right click or tap on a user',
      }),
    z
      .literal(3)
      .openapi({
        title: 'MESSAGE',
        description: 'A UI-based command that shows up when you right click or tap on a message',
      }),
    z
      .literal(4)
      .openapi({
        title: 'PRIMARY_ENTRY_POINT',
        description:
          'A command that represents the primary way to use an application (e.g. launching an Activity)',
      }),
  ])
  .openapi('ApplicationCommandType')

const ApplicationCommandCreateRequestSchema = z
  .object({
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().max(100).nullable().exactOptional(),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    options: z
      .array(
        z.xor([
          ApplicationCommandAttachmentOptionSchema,
          ApplicationCommandBooleanOptionSchema,
          ApplicationCommandChannelOptionSchema,
          ApplicationCommandIntegerOptionSchema,
          ApplicationCommandMentionableOptionSchema,
          ApplicationCommandNumberOptionSchema,
          ApplicationCommandRoleOptionSchema,
          ApplicationCommandStringOptionSchema,
          ApplicationCommandSubcommandGroupOptionSchema,
          ApplicationCommandSubcommandOptionSchema,
          ApplicationCommandUserOptionSchema,
        ]),
      )
      .max(25)
      .nullable()
      .exactOptional(),
    default_member_permissions: z.int().min(0).max(9007199254740991).nullable().exactOptional(),
    dm_permission: z.boolean().nullable().exactOptional(),
    contexts: z.array(InteractionContextTypeSchema).min(1).nullable().exactOptional(),
    integration_types: z.array(ApplicationIntegrationTypeSchema).min(1).nullable().exactOptional(),
    handler: z.xor([z.null().nullable(), ApplicationCommandHandlerSchema]).exactOptional(),
    type: z.xor([z.null().nullable(), ApplicationCommandTypeSchema]).exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('ApplicationCommandCreateRequest')

const ApplicationCommandOptionIntegerChoiceResponseSchema = z
  .object({
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    value: Int53TypeSchema,
  })
  .openapi({ required: ['name', 'value'] })
  .openapi('ApplicationCommandOptionIntegerChoiceResponse')

const ApplicationCommandIntegerOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
    autocomplete: z.boolean().exactOptional(),
    choices: z.array(ApplicationCommandOptionIntegerChoiceResponseSchema).exactOptional(),
    min_value: Int53TypeSchema.exactOptional(),
    max_value: Int53TypeSchema.exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandIntegerOptionResponse')

const ApplicationCommandMentionableOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandMentionableOptionResponse')

const ApplicationCommandOptionNumberChoiceResponseSchema = z
  .object({
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    value: z.number(),
  })
  .openapi({ required: ['name', 'value'] })
  .openapi('ApplicationCommandOptionNumberChoiceResponse')

const ApplicationCommandNumberOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
    autocomplete: z.boolean().exactOptional(),
    choices: z.array(ApplicationCommandOptionNumberChoiceResponseSchema).exactOptional(),
    min_value: z.number().exactOptional(),
    max_value: z.number().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandNumberOptionResponse')

const ApplicationCommandOptionStringChoiceResponseSchema = z
  .object({
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    value: z.string(),
  })
  .openapi({ required: ['name', 'value'] })
  .openapi('ApplicationCommandOptionStringChoiceResponse')

const ApplicationCommandPatchRequestPartialSchema = z
  .object({
    name: z.string().min(1).max(32).exactOptional(),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().max(100).nullable().exactOptional(),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    options: z
      .array(
        z.xor([
          ApplicationCommandAttachmentOptionSchema,
          ApplicationCommandBooleanOptionSchema,
          ApplicationCommandChannelOptionSchema,
          ApplicationCommandIntegerOptionSchema,
          ApplicationCommandMentionableOptionSchema,
          ApplicationCommandNumberOptionSchema,
          ApplicationCommandRoleOptionSchema,
          ApplicationCommandStringOptionSchema,
          ApplicationCommandSubcommandGroupOptionSchema,
          ApplicationCommandSubcommandOptionSchema,
          ApplicationCommandUserOptionSchema,
        ]),
      )
      .max(25)
      .nullable()
      .exactOptional(),
    default_member_permissions: z.int().min(0).max(9007199254740991).nullable().exactOptional(),
    dm_permission: z.boolean().nullable().exactOptional(),
    contexts: z.array(InteractionContextTypeSchema).min(1).nullable().exactOptional(),
    integration_types: z.array(ApplicationIntegrationTypeSchema).min(1).nullable().exactOptional(),
    handler: z.xor([z.null().nullable(), ApplicationCommandHandlerSchema]).exactOptional(),
  })
  .openapi('ApplicationCommandPatchRequestPartial')

const ApplicationCommandPermissionTypeSchema = z
  .xor([
    z.literal(1).openapi({ title: 'ROLE', description: 'This permission is for a role.' }),
    z.literal(2).openapi({ title: 'USER', description: 'This permission is for a user.' }),
    z.literal(3).openapi({ title: 'CHANNEL', description: 'This permission is for a channel.' }),
  ])
  .openapi('ApplicationCommandPermissionType')

const ApplicationCommandPermissionSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: ApplicationCommandPermissionTypeSchema,
    permission: z.boolean(),
  })
  .openapi({ required: ['id', 'type', 'permission'] })
  .openapi('ApplicationCommandPermission')

const ApplicationCommandRoleOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandRoleOptionResponse')

const ApplicationCommandStringOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
    autocomplete: z.boolean().exactOptional(),
    choices: z.array(ApplicationCommandOptionStringChoiceResponseSchema).exactOptional(),
    min_length: z.int32().exactOptional(),
    max_length: z.int32().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandStringOptionResponse')

const ApplicationCommandUserOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandUserOptionResponse')

const ApplicationCommandSubcommandOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
    options: z
      .array(
        z.xor([
          ApplicationCommandAttachmentOptionResponseSchema,
          ApplicationCommandBooleanOptionResponseSchema,
          ApplicationCommandChannelOptionResponseSchema,
          ApplicationCommandIntegerOptionResponseSchema,
          ApplicationCommandMentionableOptionResponseSchema,
          ApplicationCommandNumberOptionResponseSchema,
          ApplicationCommandRoleOptionResponseSchema,
          ApplicationCommandStringOptionResponseSchema,
          ApplicationCommandUserOptionResponseSchema,
        ]),
      )
      .exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandSubcommandOptionResponse')

const ApplicationCommandSubcommandGroupOptionResponseSchema = z
  .object({
    type: ApplicationCommandOptionTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    required: z.boolean().exactOptional(),
    options: z.array(ApplicationCommandSubcommandOptionResponseSchema).exactOptional(),
  })
  .openapi({ required: ['type', 'name', 'description'] })
  .openapi('ApplicationCommandSubcommandGroupOptionResponse')

const ApplicationCommandResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    application_id: SnowflakeTypeSchema,
    version: SnowflakeTypeSchema,
    default_member_permissions: z.string().nullable().exactOptional(),
    type: ApplicationCommandTypeSchema,
    name: z.string(),
    name_localized: z.string().exactOptional(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localized: z.string().exactOptional(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    guild_id: SnowflakeTypeSchema.exactOptional(),
    dm_permission: z.boolean().exactOptional(),
    contexts: z.array(InteractionContextTypeSchema).nullable().exactOptional(),
    integration_types: z.array(ApplicationIntegrationTypeSchema).exactOptional(),
    options: z
      .array(
        z.xor([
          ApplicationCommandAttachmentOptionResponseSchema,
          ApplicationCommandBooleanOptionResponseSchema,
          ApplicationCommandChannelOptionResponseSchema,
          ApplicationCommandIntegerOptionResponseSchema,
          ApplicationCommandMentionableOptionResponseSchema,
          ApplicationCommandNumberOptionResponseSchema,
          ApplicationCommandRoleOptionResponseSchema,
          ApplicationCommandStringOptionResponseSchema,
          ApplicationCommandSubcommandGroupOptionResponseSchema,
          ApplicationCommandSubcommandOptionResponseSchema,
          ApplicationCommandUserOptionResponseSchema,
        ]),
      )
      .exactOptional(),
    nsfw: z.boolean().exactOptional(),
  })
  .openapi({ required: ['id', 'application_id', 'version', 'type', 'name', 'description'] })
  .openapi('ApplicationCommandResponse')

const ApplicationCommandUpdateRequestSchema = z
  .object({
    name: z.string().min(1).max(32),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(32))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    description: z.string().max(100).nullable().exactOptional(),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 34 }),
    options: z
      .array(
        z.xor([
          ApplicationCommandAttachmentOptionSchema,
          ApplicationCommandBooleanOptionSchema,
          ApplicationCommandChannelOptionSchema,
          ApplicationCommandIntegerOptionSchema,
          ApplicationCommandMentionableOptionSchema,
          ApplicationCommandNumberOptionSchema,
          ApplicationCommandRoleOptionSchema,
          ApplicationCommandStringOptionSchema,
          ApplicationCommandSubcommandGroupOptionSchema,
          ApplicationCommandSubcommandOptionSchema,
          ApplicationCommandUserOptionSchema,
        ]),
      )
      .max(25)
      .nullable()
      .exactOptional(),
    default_member_permissions: z.int().min(0).max(9007199254740991).nullable().exactOptional(),
    dm_permission: z.boolean().nullable().exactOptional(),
    contexts: z.array(InteractionContextTypeSchema).min(1).nullable().exactOptional(),
    integration_types: z.array(ApplicationIntegrationTypeSchema).min(1).nullable().exactOptional(),
    handler: z.xor([z.null().nullable(), ApplicationCommandHandlerSchema]).exactOptional(),
    type: z.xor([z.null().nullable(), ApplicationCommandTypeSchema]).exactOptional(),
    id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('ApplicationCommandUpdateRequest')

const ApplicationExplicitContentFilterTypesSchema = z
  .xor([
    z.literal(0).openapi({ title: 'INHERIT', description: 'inherit guild content filter setting' }),
    z.literal(1).openapi({ title: 'ALWAYS', description: 'interactions will always be scanned' }),
  ])
  .openapi('ApplicationExplicitContentFilterTypes')

const ApplicationOAuth2InstallParamsSchema = z
  .object({
    scopes: z.array(OAuth2ScopesSchema).min(1).nullable().exactOptional(),
    permissions: z.int().min(0).max(9007199254740991).nullable().exactOptional(),
  })
  .openapi('ApplicationOAuth2InstallParams')

const ApplicationIntegrationTypeConfigurationSchema = z
  .object({
    oauth2_install_params: z
      .xor([z.null().nullable(), ApplicationOAuth2InstallParamsSchema])
      .exactOptional(),
  })
  .openapi('ApplicationIntegrationTypeConfiguration')

const ApplicationFormPartialSchema = z
  .object({
    description: z
      .object({
        default: z.string().max(400),
        localizations: z.record(z.string(), z.string().max(400)).nullable().exactOptional(),
      })
      .nullable()
      .exactOptional()
      .openapi({ required: ['default'] }),
    icon: z.string().nullable().exactOptional(),
    cover_image: z.string().nullable().exactOptional(),
    team_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    flags: z.int().nullable().exactOptional(),
    interactions_endpoint_url: z.url().max(2048).nullable().exactOptional(),
    explicit_content_filter: z
      .xor([z.null().nullable(), ApplicationExplicitContentFilterTypesSchema])
      .exactOptional(),
    max_participants: z.int32().min(-1).nullable().exactOptional(),
    type: z.xor([z.null().nullable(), ApplicationTypesSchema]).exactOptional(),
    tags: z.array(z.string().max(20)).max(5).nullable().exactOptional(),
    custom_install_url: z.url().max(2048).nullable().exactOptional(),
    install_params: z
      .xor([z.null().nullable(), ApplicationOAuth2InstallParamsSchema])
      .exactOptional(),
    role_connections_verification_url: z.url().max(2048).nullable().exactOptional(),
    integration_types_config: z
      .record(
        z.string(),
        z.xor([z.null().nullable(), ApplicationIntegrationTypeConfigurationSchema]),
      )
      .nullable()
      .exactOptional()
      .openapi({ minProperties: 1, maxProperties: 2 }),
  })
  .openapi('ApplicationFormPartial')

const ApplicationIdentityProviderAuthTypeSchema = z
  .xor([
    z.literal('OIDC').openapi({ title: 'OIDC' }),
    z
      .literal('EPIC_ONLINE_SERVICES_ACCESS_TOKEN')
      .openapi({ title: 'EPIC_ONLINE_SERVICES_ACCESS_TOKEN' }),
    z.literal('EPIC_ONLINE_SERVICES_ID_TOKEN').openapi({ title: 'EPIC_ONLINE_SERVICES_ID_TOKEN' }),
    z.literal('STEAM_SESSION_TICKET').openapi({ title: 'STEAM_SESSION_TICKET' }),
    z.literal('UNITY_SERVICES_ID_TOKEN').openapi({ title: 'UNITY_SERVICES_ID_TOKEN' }),
    z
      .literal('DISCORD_BOT_ISSUED_ACCESS_TOKEN')
      .openapi({ title: 'DISCORD_BOT_ISSUED_ACCESS_TOKEN' }),
    z.literal('APPLE_ID_TOKEN').openapi({ title: 'APPLE_ID_TOKEN' }),
    z.literal('PLAYSTATION_NETWORK_ID_TOKEN').openapi({ title: 'PLAYSTATION_NETWORK_ID_TOKEN' }),
  ])
  .openapi('ApplicationIdentityProviderAuthType')

const WebhookTypesSchema = z
  .xor([
    z
      .literal(1)
      .openapi({
        title: 'GUILD_INCOMING',
        description: 'Incoming Webhooks can post messages to channels with a generated token',
      }),
    z
      .literal(2)
      .openapi({
        title: 'CHANNEL_FOLLOWER',
        description:
          'Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels',
      }),
    z
      .literal(3)
      .openapi({
        title: 'APPLICATION_INCOMING',
        description: 'Application webhooks are webhooks used with Interactions',
      }),
  ])
  .openapi('WebhookTypes')

const ApplicationIncomingWebhookResponseSchema = z
  .object({
    application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    avatar: z.string().nullable().exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    id: SnowflakeTypeSchema,
    name: z.string(),
    type: WebhookTypesSchema,
    user: UserResponseSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'type'] })
  .openapi('ApplicationIncomingWebhookResponse')

const MetadataItemTypesSchema = z
  .xor([
    z
      .literal(1)
      .openapi({
        title: 'INTEGER_LESS_THAN_EQUAL',
        description:
          "the metadata value (integer) is less than or equal to the guild's configured value (integer)",
      }),
    z
      .literal(2)
      .openapi({
        title: 'INTEGER_GREATER_THAN_EQUAL',
        description:
          "the metadata value (integer) is greater than or equal to the guild's configured value (integer)",
      }),
    z
      .literal(3)
      .openapi({
        title: 'INTEGER_EQUAL',
        description:
          "the metadata value (integer) is equal to the guild's configured value (integer)",
      }),
    z
      .literal(4)
      .openapi({
        title: 'INTEGER_NOT_EQUAL',
        description:
          "the metadata value (integer) is not equal to the guild's configured value (integer)",
      }),
    z
      .literal(5)
      .openapi({
        title: 'DATETIME_LESS_THAN_EQUAL',
        description:
          "the metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date)",
      }),
    z
      .literal(6)
      .openapi({
        title: 'DATETIME_GREATER_THAN_EQUAL',
        description:
          "the metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date)",
      }),
    z
      .literal(7)
      .openapi({
        title: 'BOOLEAN_EQUAL',
        description:
          "the metadata value (integer) is equal to the guild's configured value (integer; 1)",
      }),
    z
      .literal(8)
      .openapi({
        title: 'BOOLEAN_NOT_EQUAL',
        description:
          "the metadata value (integer) is not equal to the guild's configured value (integer; 1)",
      }),
  ])
  .openapi('MetadataItemTypes')

const ApplicationRoleConnectionsMetadataItemRequestSchema = z
  .object({
    type: MetadataItemTypesSchema,
    key: z.string().min(1).max(50),
    name: z.string().min(1).max(100),
    name_localizations: z
      .record(z.string(), z.string().min(1).max(100).nullable())
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 1521 }),
    description: z.string().min(1).max(200),
    description_localizations: z
      .record(z.string(), z.string().min(1).max(200).nullable())
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 1521 }),
  })
  .openapi({ required: ['type', 'key', 'name', 'description'] })
  .openapi('ApplicationRoleConnectionsMetadataItemRequest')

const ApplicationRoleConnectionsMetadataItemResponseSchema = z
  .object({
    type: MetadataItemTypesSchema,
    key: z.string(),
    name: z.string(),
    name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
    description: z.string(),
    description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'key', 'name', 'description'] })
  .openapi('ApplicationRoleConnectionsMetadataItemResponse')

const ApplicationUserRoleConnectionResponseSchema = z
  .object({
    platform_name: z.string().nullable().exactOptional(),
    platform_username: z.string().nullable().exactOptional(),
    metadata: z.record(z.string(), z.string()).exactOptional(),
  })
  .openapi({ required: [] })
  .openapi('ApplicationUserRoleConnectionResponse')

const AuditLogActionTypesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'GUILD_UPDATE' }),
    z.literal(10).openapi({ title: 'CHANNEL_CREATE' }),
    z.literal(11).openapi({ title: 'CHANNEL_UPDATE' }),
    z.literal(12).openapi({ title: 'CHANNEL_DELETE' }),
    z.literal(13).openapi({ title: 'CHANNEL_OVERWRITE_CREATE' }),
    z.literal(14).openapi({ title: 'CHANNEL_OVERWRITE_UPDATE' }),
    z.literal(15).openapi({ title: 'CHANNEL_OVERWRITE_DELETE' }),
    z.literal(20).openapi({ title: 'MEMBER_KICK' }),
    z.literal(21).openapi({ title: 'MEMBER_PRUNE' }),
    z.literal(22).openapi({ title: 'MEMBER_BAN_ADD' }),
    z.literal(23).openapi({ title: 'MEMBER_BAN_REMOVE' }),
    z.literal(24).openapi({ title: 'MEMBER_UPDATE' }),
    z.literal(25).openapi({ title: 'MEMBER_ROLE_UPDATE' }),
    z.literal(26).openapi({ title: 'MEMBER_MOVE' }),
    z.literal(27).openapi({ title: 'MEMBER_DISCONNECT' }),
    z.literal(28).openapi({ title: 'BOT_ADD' }),
    z.literal(30).openapi({ title: 'ROLE_CREATE' }),
    z.literal(31).openapi({ title: 'ROLE_UPDATE' }),
    z.literal(32).openapi({ title: 'ROLE_DELETE' }),
    z.literal(40).openapi({ title: 'INVITE_CREATE' }),
    z.literal(41).openapi({ title: 'INVITE_UPDATE' }),
    z.literal(42).openapi({ title: 'INVITE_DELETE' }),
    z.literal(50).openapi({ title: 'WEBHOOK_CREATE' }),
    z.literal(51).openapi({ title: 'WEBHOOK_UPDATE' }),
    z.literal(52).openapi({ title: 'WEBHOOK_DELETE' }),
    z.literal(60).openapi({ title: 'EMOJI_CREATE' }),
    z.literal(61).openapi({ title: 'EMOJI_UPDATE' }),
    z.literal(62).openapi({ title: 'EMOJI_DELETE' }),
    z.literal(72).openapi({ title: 'MESSAGE_DELETE' }),
    z.literal(73).openapi({ title: 'MESSAGE_BULK_DELETE' }),
    z.literal(74).openapi({ title: 'MESSAGE_PIN' }),
    z.literal(75).openapi({ title: 'MESSAGE_UNPIN' }),
    z.literal(80).openapi({ title: 'INTEGRATION_CREATE' }),
    z.literal(81).openapi({ title: 'INTEGRATION_UPDATE' }),
    z.literal(82).openapi({ title: 'INTEGRATION_DELETE' }),
    z.literal(83).openapi({ title: 'STAGE_INSTANCE_CREATE' }),
    z.literal(84).openapi({ title: 'STAGE_INSTANCE_UPDATE' }),
    z.literal(85).openapi({ title: 'STAGE_INSTANCE_DELETE' }),
    z.literal(90).openapi({ title: 'STICKER_CREATE' }),
    z.literal(91).openapi({ title: 'STICKER_UPDATE' }),
    z.literal(92).openapi({ title: 'STICKER_DELETE' }),
    z.literal(100).openapi({ title: 'GUILD_SCHEDULED_EVENT_CREATE' }),
    z.literal(101).openapi({ title: 'GUILD_SCHEDULED_EVENT_UPDATE' }),
    z.literal(102).openapi({ title: 'GUILD_SCHEDULED_EVENT_DELETE' }),
    z.literal(110).openapi({ title: 'THREAD_CREATE' }),
    z.literal(111).openapi({ title: 'THREAD_UPDATE' }),
    z.literal(112).openapi({ title: 'THREAD_DELETE' }),
    z.literal(121).openapi({ title: 'APPLICATION_COMMAND_PERMISSION_UPDATE' }),
    z.literal(130).openapi({ title: 'SOUNDBOARD_SOUND_CREATE' }),
    z.literal(131).openapi({ title: 'SOUNDBOARD_SOUND_UPDATE' }),
    z.literal(132).openapi({ title: 'SOUNDBOARD_SOUND_DELETE' }),
    z.literal(140).openapi({ title: 'AUTO_MODERATION_RULE_CREATE' }),
    z.literal(141).openapi({ title: 'AUTO_MODERATION_RULE_UPDATE' }),
    z.literal(142).openapi({ title: 'AUTO_MODERATION_RULE_DELETE' }),
    z.literal(143).openapi({ title: 'AUTO_MODERATION_BLOCK_MESSAGE' }),
    z.literal(144).openapi({ title: 'AUTO_MODERATION_FLAG_TO_CHANNEL' }),
    z.literal(145).openapi({ title: 'AUTO_MODERATION_USER_COMM_DISABLED' }),
    z.literal(146).openapi({ title: 'AUTO_MODERATION_QUARANTINE_USER' }),
    z.literal(150).openapi({ title: 'CREATOR_MONETIZATION_REQUEST_CREATED' }),
    z.literal(151).openapi({ title: 'CREATOR_MONETIZATION_TERMS_ACCEPTED' }),
    z.literal(163).openapi({ title: 'ONBOARDING_PROMPT_CREATE' }),
    z.literal(164).openapi({ title: 'ONBOARDING_PROMPT_UPDATE' }),
    z.literal(165).openapi({ title: 'ONBOARDING_PROMPT_DELETE' }),
    z.literal(166).openapi({ title: 'ONBOARDING_CREATE' }),
    z.literal(167).openapi({ title: 'ONBOARDING_UPDATE' }),
    z.literal(171).openapi({ title: 'GUILD_HOME_FEATURE_ITEM' }),
    z.literal(172).openapi({ title: 'GUILD_HOME_REMOVE_ITEM' }),
    z.literal(180).openapi({ title: 'HARMFUL_LINKS_BLOCKED_MESSAGE' }),
    z.literal(190).openapi({ title: 'HOME_SETTINGS_CREATE' }),
    z.literal(191).openapi({ title: 'HOME_SETTINGS_UPDATE' }),
    z.literal(192).openapi({ title: 'VOICE_CHANNEL_STATUS_CREATE' }),
    z.literal(193).openapi({ title: 'VOICE_CHANNEL_STATUS_DELETE' }),
    z.literal(211).openapi({ title: 'GUILD_PROFILE_UPDATE' }),
  ])
  .openapi('AuditLogActionTypes')

const AuditLogObjectChangeResponseSchema = z
  .object({
    key: z.string().nullable().exactOptional(),
    new_value: z.any().exactOptional(),
    old_value: z.any().exactOptional(),
  })
  .openapi({ required: [] })
  .openapi('AuditLogObjectChangeResponse')

const AuditLogEntryResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    action_type: AuditLogActionTypesSchema,
    user_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    target_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    changes: z.array(AuditLogObjectChangeResponseSchema).exactOptional(),
    options: z.record(z.string(), z.string()).exactOptional(),
    reason: z.string().exactOptional(),
  })
  .openapi({ required: ['id', 'action_type'] })
  .openapi('AuditLogEntryResponse')

const AuthorTypeSchema = z
  .xor([
    z.literal('user').openapi({ title: 'USER' }),
    z.literal('bot').openapi({ title: 'BOT' }),
    z.literal('webhook').openapi({ title: 'WEBHOOK' }),
    z.literal('-user').openapi({ title: 'NO_USER' }),
    z.literal('-bot').openapi({ title: 'NO_BOT' }),
    z.literal('-webhook').openapi({ title: 'NO_WEBHOOK' }),
  ])
  .openapi('AuthorType')

const AutomodActionTypeSchema = z
  .xor([
    z
      .literal(1)
      .openapi({
        title: 'BLOCK_MESSAGE',
        description:
          "Block a user's message and prevent it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked",
      }),
    z
      .literal(2)
      .openapi({
        title: 'FLAG_TO_CHANNEL',
        description:
          'Send a system message to a channel in order to log the user message that triggered the rule',
      }),
    z
      .literal(3)
      .openapi({
        title: 'USER_COMMUNICATION_DISABLED',
        description: "Temporarily disable a user's ability to communicate in the server (timeout)",
      }),
    z
      .literal(4)
      .openapi({
        title: 'QUARANTINE_USER',
        description: 'Prevent a user from interacting in the server',
      }),
  ])
  .openapi('AutomodActionType')

const AutomodEventTypeSchema = z
  .xor([
    z
      .literal(1)
      .openapi({ title: 'MESSAGE_SEND', description: 'A user submitted a message to a channel' }),
    z
      .literal(2)
      .openapi({
        title: 'GUILD_MEMBER_JOIN_OR_UPDATE',
        description:
          "A user is attempting to join the server or a member's properties were updated.",
      }),
  ])
  .openapi('AutomodEventType')

const AutomodKeywordPresetTypeSchema = z
  .xor([
    z
      .literal(1)
      .openapi({
        title: 'PROFANITY',
        description: 'Words and phrases that may be considered profanity',
      }),
    z
      .literal(2)
      .openapi({
        title: 'SEXUAL_CONTENT',
        description: 'Words and phrases that may be considered as sexual content',
      }),
    z
      .literal(3)
      .openapi({
        title: 'SLURS',
        description: 'Words and phrases that may be considered slurs and hate speech',
      }),
  ])
  .openapi('AutomodKeywordPresetType')

const AutomodTriggerTypeSchema = z
  .xor([
    z
      .literal(1)
      .openapi({
        title: 'KEYWORD',
        description: 'Check if content contains words from a list of keywords or matches regex',
      }),
    z.literal(2).openapi({ title: 'SPAM_LINK', description: 'DEPRECATED' }),
    z
      .literal(3)
      .openapi({ title: 'ML_SPAM', description: 'Check if content represents generic spam' }),
    z
      .literal(4)
      .openapi({
        title: 'DEFAULT_KEYWORD_LIST',
        description: 'Check if content contains words from internal pre-defined wordsets',
      }),
    z
      .literal(5)
      .openapi({
        title: 'MENTION_SPAM',
        description: 'Check if content contains more unique mentions than allowed',
      }),
  ])
  .openapi('AutomodTriggerType')

const AvailableLocalesEnumSchema = z
  .xor([
    z.literal('ar').openapi({ title: 'ar', description: 'The ar locale' }),
    z.literal('bg').openapi({ title: 'bg', description: 'The bg locale' }),
    z.literal('cs').openapi({ title: 'cs', description: 'The cs locale' }),
    z.literal('da').openapi({ title: 'da', description: 'The da locale' }),
    z.literal('de').openapi({ title: 'de', description: 'The de locale' }),
    z.literal('el').openapi({ title: 'el', description: 'The el locale' }),
    z.literal('en-GB').openapi({ title: 'en-GB', description: 'The en-GB locale' }),
    z.literal('en-US').openapi({ title: 'en-US', description: 'The en-US locale' }),
    z.literal('es-419').openapi({ title: 'es-419', description: 'The es-419 locale' }),
    z.literal('es-ES').openapi({ title: 'es-ES', description: 'The es-ES locale' }),
    z.literal('fi').openapi({ title: 'fi', description: 'The fi locale' }),
    z.literal('fr').openapi({ title: 'fr', description: 'The fr locale' }),
    z.literal('he').openapi({ title: 'he', description: 'The he locale' }),
    z.literal('hi').openapi({ title: 'hi', description: 'The hi locale' }),
    z.literal('hr').openapi({ title: 'hr', description: 'The hr locale' }),
    z.literal('hu').openapi({ title: 'hu', description: 'The hu locale' }),
    z.literal('id').openapi({ title: 'id', description: 'The id locale' }),
    z.literal('it').openapi({ title: 'it', description: 'The it locale' }),
    z.literal('ja').openapi({ title: 'ja', description: 'The ja locale' }),
    z.literal('ko').openapi({ title: 'ko', description: 'The ko locale' }),
    z.literal('lt').openapi({ title: 'lt', description: 'The lt locale' }),
    z.literal('nl').openapi({ title: 'nl', description: 'The nl locale' }),
    z.literal('no').openapi({ title: 'no', description: 'The no locale' }),
    z.literal('pl').openapi({ title: 'pl', description: 'The pl locale' }),
    z.literal('pt-BR').openapi({ title: 'pt-BR', description: 'The pt-BR locale' }),
    z.literal('ro').openapi({ title: 'ro', description: 'The ro locale' }),
    z.literal('ru').openapi({ title: 'ru', description: 'The ru locale' }),
    z.literal('sv-SE').openapi({ title: 'sv-SE', description: 'The sv-SE locale' }),
    z.literal('th').openapi({ title: 'th', description: 'The th locale' }),
    z.literal('tr').openapi({ title: 'tr', description: 'The tr locale' }),
    z.literal('uk').openapi({ title: 'uk', description: 'The uk locale' }),
    z.literal('vi').openapi({ title: 'vi', description: 'The vi locale' }),
    z.literal('zh-CN').openapi({ title: 'zh-CN', description: 'The zh-CN locale' }),
    z.literal('zh-TW').openapi({ title: 'zh-TW', description: 'The zh-TW locale' }),
  ])
  .openapi('AvailableLocalesEnum')

const BanUserFromGuildRequestSchema = z
  .object({
    delete_message_seconds: z.int().min(0).max(604800).nullable().exactOptional(),
    delete_message_days: z.int().min(0).max(7).nullable().exactOptional(),
  })
  .openapi('BanUserFromGuildRequest')

const RichEmbedAuthorSchema = z
  .object({
    name: z.string().max(256).nullable().exactOptional(),
    url: z.url().max(2048).nullable().exactOptional(),
    icon_url: z.url().max(2048).nullable().exactOptional(),
  })
  .openapi('RichEmbedAuthor')

const RichEmbedImageSchema = z
  .object({
    url: z.url().max(2048).nullable().exactOptional(),
    width: z.int().nullable().exactOptional(),
    height: z.int().nullable().exactOptional(),
    placeholder: z.string().max(64).nullable().exactOptional(),
    placeholder_version: z.int().min(0).max(2147483647).nullable().exactOptional(),
    is_animated: z.boolean().nullable().exactOptional(),
    description: z.string().max(4096).nullable().exactOptional(),
  })
  .openapi('RichEmbedImage')

const RichEmbedThumbnailSchema = z
  .object({
    url: z.url().max(2048).nullable().exactOptional(),
    width: z.int().nullable().exactOptional(),
    height: z.int().nullable().exactOptional(),
    placeholder: z.string().max(64).nullable().exactOptional(),
    placeholder_version: z.int().min(0).max(2147483647).nullable().exactOptional(),
    is_animated: z.boolean().nullable().exactOptional(),
    description: z.string().max(4096).nullable().exactOptional(),
  })
  .openapi('RichEmbedThumbnail')

const RichEmbedFooterSchema = z
  .object({
    text: z.string().max(2048).nullable().exactOptional(),
    icon_url: z.url().max(2048).nullable().exactOptional(),
  })
  .openapi('RichEmbedFooter')

const RichEmbedFieldSchema = z
  .object({
    name: z.string().max(256),
    value: z.string().max(1024),
    inline: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['name', 'value'] })
  .openapi('RichEmbedField')

const RichEmbedProviderSchema = z
  .object({
    name: z.string().max(256).nullable().exactOptional(),
    url: z.url().max(2048).nullable().exactOptional(),
  })
  .openapi('RichEmbedProvider')

const RichEmbedVideoSchema = z
  .object({
    url: z.url().max(2048).nullable().exactOptional(),
    width: z.int().nullable().exactOptional(),
    height: z.int().nullable().exactOptional(),
    placeholder: z.string().max(64).nullable().exactOptional(),
    placeholder_version: z.int().min(0).max(2147483647).nullable().exactOptional(),
    is_animated: z.boolean().nullable().exactOptional(),
    description: z.string().max(4096).nullable().exactOptional(),
  })
  .openapi('RichEmbedVideo')

const RichEmbedSchema = z
  .object({
    type: z.string().max(152133).nullable().exactOptional(),
    url: z.url().max(2048).nullable().exactOptional(),
    title: z.string().max(256).nullable().exactOptional(),
    color: z.int().min(0).max(16777215).nullable().exactOptional(),
    timestamp: z.iso.datetime().nullable().exactOptional(),
    description: z.string().max(4096).nullable().exactOptional(),
    author: z.xor([z.null().nullable(), RichEmbedAuthorSchema]).exactOptional(),
    image: z.xor([z.null().nullable(), RichEmbedImageSchema]).exactOptional(),
    thumbnail: z.xor([z.null().nullable(), RichEmbedThumbnailSchema]).exactOptional(),
    footer: z.xor([z.null().nullable(), RichEmbedFooterSchema]).exactOptional(),
    fields: z.array(RichEmbedFieldSchema).max(25).nullable().exactOptional(),
    provider: z.xor([z.null().nullable(), RichEmbedProviderSchema]).exactOptional(),
    video: z.xor([z.null().nullable(), RichEmbedVideoSchema]).exactOptional(),
  })
  .openapi('RichEmbed')

const MessageAllowedMentionsRequestSchema = z
  .object({
    parse: z
      .array(z.xor([z.null().nullable(), AllowedMentionTypesSchema]))
      .max(1521)
      .nullable()
      .exactOptional(),
    users: z
      .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
      .max(100)
      .nullable()
      .exactOptional(),
    roles: z
      .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
      .max(100)
      .nullable()
      .exactOptional(),
    replied_user: z.boolean().nullable().exactOptional(),
  })
  .openapi('MessageAllowedMentionsRequest')

const UnfurledMediaRequestWithAttachmentReferenceRequiredSchema = z
  .object({ url: z.url().max(2048) })
  .openapi({ required: ['url'] })
  .openapi('UnfurledMediaRequestWithAttachmentReferenceRequired')

const FileComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    spoiler: z.boolean().nullable().exactOptional(),
    file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
  })
  .openapi({ required: ['type', 'file'] })
  .openapi('FileComponentForMessageRequest')

const UnfurledMediaRequestSchema = z
  .object({ url: z.url().max(2048) })
  .openapi({ required: ['url'] })
  .openapi('UnfurledMediaRequest')

const MediaGalleryItemRequestSchema = z
  .object({
    description: z.string().min(1).max(1024).nullable().exactOptional(),
    spoiler: z.boolean().nullable().exactOptional(),
    media: UnfurledMediaRequestSchema,
  })
  .openapi({ required: ['media'] })
  .openapi('MediaGalleryItemRequest')

const MediaGalleryComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    items: z.array(MediaGalleryItemRequestSchema).min(1).max(10),
  })
  .openapi({ required: ['type', 'items'] })
  .openapi('MediaGalleryComponentForMessageRequest')

const TextDisplayComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    content: z.string().min(1).max(4000),
  })
  .openapi({ required: ['type', 'content'] })
  .openapi('TextDisplayComponentForMessageRequest')

const ThumbnailComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    description: z.string().min(1).max(1024).nullable().exactOptional(),
    spoiler: z.boolean().nullable().exactOptional(),
    media: UnfurledMediaRequestSchema,
  })
  .openapi({ required: ['type', 'media'] })
  .openapi('ThumbnailComponentForMessageRequest')

const SectionComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    components: z.array(TextDisplayComponentForMessageRequestSchema).min(1).max(3),
    accessory: z.xor([
      ButtonComponentForMessageRequestSchema,
      ThumbnailComponentForMessageRequestSchema,
    ]),
  })
  .openapi({ required: ['type', 'components', 'accessory'] })
  .openapi('SectionComponentForMessageRequest')

const SeparatorComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    spacing: z
      .xor([z.null().nullable(), MessageComponentSeparatorSpacingSizeSchema])
      .exactOptional(),
    divider: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['type'] })
  .openapi('SeparatorComponentForMessageRequest')

const ContainerComponentForMessageRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    accent_color: z.int().min(0).max(16777215).nullable().exactOptional(),
    components: z
      .array(
        z.xor([
          ActionRowComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      )
      .min(1)
      .max(40),
    spoiler: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'components'] })
  .openapi('ContainerComponentForMessageRequest')

const MessageAttachmentRequestSchema = z
  .object({
    id: SnowflakeTypeSchema,
    filename: z.string().max(1024).nullable().exactOptional(),
    description: z.string().max(1024).nullable().exactOptional(),
    duration_secs: z.number().min(0).max(2147483647).nullable().exactOptional(),
    waveform: z.string().max(400).nullable().exactOptional(),
    title: z.string().max(1024).nullable().exactOptional(),
    is_remix: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['id'] })
  .openapi('MessageAttachmentRequest')

const PollEmojiSchema = z
  .object({
    id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    name: z.string().max(32).nullable().exactOptional(),
    animated: z.boolean().nullable().exactOptional(),
  })
  .openapi('PollEmoji')

const PollMediaSchema = z
  .object({
    text: z.string().min(1).max(300).nullable().exactOptional(),
    emoji: z.xor([z.null().nullable(), PollEmojiSchema]).exactOptional(),
  })
  .openapi('PollMedia')

const PollEmojiCreateRequestSchema = z
  .object({
    id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    name: z.string().max(32).nullable().exactOptional(),
    animated: z.boolean().nullable().exactOptional(),
  })
  .openapi('PollEmojiCreateRequest')

const PollMediaCreateRequestSchema = z
  .object({
    text: z.string().min(1).max(300).nullable().exactOptional(),
    emoji: z.xor([z.null().nullable(), PollEmojiCreateRequestSchema]).exactOptional(),
  })
  .openapi('PollMediaCreateRequest')

const PollAnswerCreateRequestSchema = z
  .object({ poll_media: PollMediaCreateRequestSchema })
  .openapi({ required: ['poll_media'] })
  .openapi('PollAnswerCreateRequest')

const PollCreateRequestSchema = z
  .object({
    question: PollMediaSchema,
    answers: z.array(PollAnswerCreateRequestSchema).min(1).max(10),
    allow_multiselect: z.boolean().nullable().exactOptional(),
    layout_type: z.xor([z.null().nullable(), PollLayoutTypesSchema]).exactOptional(),
    duration: z.int32().min(1).max(768).nullable().exactOptional(),
  })
  .openapi({ required: ['question', 'answers'] })
  .openapi('PollCreateRequest')

const CustomClientThemeShareRequestSchema = z
  .object({
    colors: z.array(z.string().length(6)).min(1).max(5),
    gradient_angle: z.int32().min(0).max(360),
    base_mix: z.int32().min(0).max(100),
    base_theme: z
      .xor([z.null().nullable(), MessageShareCustomUserThemeBaseThemeSchema])
      .exactOptional(),
  })
  .openapi({ required: ['colors', 'gradient_angle', 'base_mix'] })
  .openapi('CustomClientThemeShareRequest')

const ConfettiPotionCreateRequestSchema = z.object({}).openapi('ConfettiPotionCreateRequest')

const BaseCreateMessageCreateRequestSchema = z
  .object({
    content: z.string().max(4000).nullable().exactOptional(),
    embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
    allowed_mentions: z
      .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
      .exactOptional(),
    sticker_ids: z.array(SnowflakeTypeSchema).max(3).nullable().exactOptional(),
    components: z
      .array(
        z.xor([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      )
      .max(40)
      .nullable()
      .exactOptional(),
    flags: z.int().nullable().exactOptional(),
    attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
    poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
    shared_client_theme: z
      .xor([z.null().nullable(), CustomClientThemeShareRequestSchema])
      .exactOptional(),
    confetti_potion: z
      .xor([z.null().nullable(), ConfettiPotionCreateRequestSchema])
      .exactOptional(),
  })
  .openapi('BaseCreateMessageCreateRequest')

const BlockMessageActionMetadataSchema = z
  .object({ custom_message: z.string().max(150).nullable().exactOptional() })
  .openapi('BlockMessageActionMetadata')

const BlockMessageActionSchema = z
  .object({
    type: AutomodActionTypeSchema,
    metadata: z.xor([z.null().nullable(), BlockMessageActionMetadataSchema]).exactOptional(),
  })
  .openapi({ required: ['type'] })
  .openapi('BlockMessageAction')

const BlockMessageActionMetadataResponseSchema = z
  .object({ custom_message: z.string().exactOptional() })
  .openapi({ required: [] })
  .openapi('BlockMessageActionMetadataResponse')

const BlockMessageActionResponseSchema = z
  .object({ type: AutomodActionTypeSchema, metadata: BlockMessageActionMetadataResponseSchema })
  .openapi({ required: ['type', 'metadata'] })
  .openapi('BlockMessageActionResponse')

const BotAccountPatchRequestSchema = z
  .object({
    username: z.string().min(2).max(32),
    avatar: z.string().nullable().exactOptional(),
    banner: z.string().nullable().exactOptional(),
  })
  .openapi({ required: ['username'] })
  .openapi('BotAccountPatchRequest')

const BotAddGuildMemberRequestSchema = z
  .object({
    nick: z.string().max(32).nullable().exactOptional(),
    roles: z.array(SnowflakeTypeSchema).max(250).nullable().exactOptional(),
    mute: z.boolean().nullable().exactOptional(),
    deaf: z.boolean().nullable().exactOptional(),
    access_token: z.string().max(10240),
    flags: z.int().nullable().exactOptional(),
  })
  .openapi({ required: ['access_token'] })
  .openapi('BotAddGuildMemberRequest')

const BulkBanUsersRequestSchema = z
  .object({
    user_ids: z.array(SnowflakeTypeSchema).max(200),
    delete_message_seconds: z.int().min(0).max(604800).nullable().exactOptional(),
  })
  .openapi({ required: ['user_ids'] })
  .openapi('BulkBanUsersRequest')

const BulkBanUsersResponseSchema = z
  .object({
    banned_users: z.array(SnowflakeTypeSchema),
    failed_users: z.array(SnowflakeTypeSchema),
  })
  .openapi({ required: ['banned_users', 'failed_users'] })
  .openapi('BulkBanUsersResponse')

const BulkLobbyMemberRequestSchema = z
  .object({
    id: SnowflakeTypeSchema,
    metadata: z
      .record(z.string(), z.string().max(1024))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 25 }),
    flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
    remove_member: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['id'] })
  .openapi('BulkLobbyMemberRequest')

const RecurrenceRuleWeekdaysSchema = z
  .xor([
    z.literal(0).openapi({ title: 'MONDAY' }),
    z.literal(1).openapi({ title: 'TUESDAY' }),
    z.literal(2).openapi({ title: 'WEDNESDAY' }),
    z.literal(3).openapi({ title: 'THURSDAY' }),
    z.literal(4).openapi({ title: 'FRIDAY' }),
    z.literal(5).openapi({ title: 'SATURDAY' }),
    z.literal(6).openapi({ title: 'SUNDAY' }),
  ])
  .openapi('RecurrenceRuleWeekdays')

const ByNWeekdaySchema = z
  .object({ n: z.int32().min(1).max(5), day: RecurrenceRuleWeekdaysSchema })
  .openapi({ required: ['n', 'day'] })
  .openapi('ByNWeekday')

const ByNWeekdayResponseSchema = z
  .object({ n: z.int32(), day: RecurrenceRuleWeekdaysSchema })
  .openapi({ required: ['n', 'day'] })
  .openapi('ByNWeekdayResponse')

const ChannelFollowerResponseSchema = z
  .object({ channel_id: SnowflakeTypeSchema, webhook_id: SnowflakeTypeSchema })
  .openapi({ required: ['channel_id', 'webhook_id'] })
  .openapi('ChannelFollowerResponse')

const WebhookSourceGuildResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    icon: z.string().nullable().exactOptional(),
    name: z.string(),
  })
  .openapi({ required: ['id', 'name'] })
  .openapi('WebhookSourceGuildResponse')

const WebhookSourceChannelResponseSchema = z
  .object({ id: SnowflakeTypeSchema, name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('WebhookSourceChannelResponse')

const ChannelFollowerWebhookResponseSchema = z
  .object({
    application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    avatar: z.string().nullable().exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    id: SnowflakeTypeSchema,
    name: z.string(),
    type: WebhookTypesSchema,
    user: UserResponseSchema.exactOptional(),
    source_guild: WebhookSourceGuildResponseSchema.exactOptional(),
    source_channel: WebhookSourceChannelResponseSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'type'] })
  .openapi('ChannelFollowerWebhookResponse')

const ChannelPermissionOverwriteRequestSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: z.xor([z.null().nullable(), ChannelPermissionOverwritesSchema]).exactOptional(),
    allow: z.int().nullable().exactOptional(),
    deny: z.int().nullable().exactOptional(),
  })
  .openapi({ required: ['id'] })
  .openapi('ChannelPermissionOverwriteRequest')

const ChannelSelectComponentForModalRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    placeholder: z.string().max(150).nullable().exactOptional(),
    min_values: z.int().min(0).max(25).nullable().exactOptional(),
    max_values: z.int().min(1).max(25).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    default_values: z.array(ChannelSelectDefaultValueSchema).max(25).nullable().exactOptional(),
    channel_types: z.array(ChannelTypesSchema).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'custom_id'] })
  .openapi('ChannelSelectComponentForModalRequest')

const CommandPermissionResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: ApplicationCommandPermissionTypeSchema,
    permission: z.boolean(),
  })
  .openapi({ required: ['id', 'type', 'permission'] })
  .openapi('CommandPermissionResponse')

const CommandPermissionsResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    permissions: z.array(CommandPermissionResponseSchema),
  })
  .openapi({ required: ['id', 'application_id', 'guild_id', 'permissions'] })
  .openapi('CommandPermissionsResponse')

const ConnectedAccountGuildResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    icon: z.string().nullable().exactOptional(),
  })
  .openapi({ required: ['id', 'name'] })
  .openapi('ConnectedAccountGuildResponse')

const IntegrationTypesSchema = z
  .xor([
    z.literal('discord').openapi({ title: 'DISCORD' }),
    z.literal('twitch').openapi({ title: 'TWITCH' }),
    z.literal('youtube').openapi({ title: 'YOUTUBE' }),
    z.literal('guild_subscription').openapi({ title: 'GUILD_SUBSCRIPTION' }),
  ])
  .openapi('IntegrationTypes')

const ConnectedAccountIntegrationResponseSchema = z
  .object({
    id: z.string(),
    type: IntegrationTypesSchema,
    account: AccountResponseSchema,
    guild: ConnectedAccountGuildResponseSchema,
  })
  .openapi({ required: ['id', 'type', 'account', 'guild'] })
  .openapi('ConnectedAccountIntegrationResponse')

const ConnectedAccountProvidersSchema = z
  .xor([
    z.literal('battlenet').openapi({ title: 'BATTLENET' }),
    z.literal('bluesky').openapi({ title: 'BLUESKY' }),
    z.literal('bungie').openapi({ title: 'BUNGIE' }),
    z.literal('ebay').openapi({ title: 'EBAY' }),
    z.literal('epicgames').openapi({ title: 'EPIC_GAMES' }),
    z.literal('facebook').openapi({ title: 'FACEBOOK' }),
    z.literal('github').openapi({ title: 'GITHUB' }),
    z.literal('instagram').openapi({ title: 'INSTAGRAM' }),
    z.literal('mastodon').openapi({ title: 'MASTODON' }),
    z.literal('leagueoflegends').openapi({ title: 'LEAGUE_OF_LEGENDS' }),
    z.literal('paypal').openapi({ title: 'PAYPAL' }),
    z.literal('playstation').openapi({ title: 'PLAYSTATION' }),
    z.literal('reddit').openapi({ title: 'REDDIT' }),
    z.literal('riotgames').openapi({ title: 'RIOT_GAMES' }),
    z.literal('roblox').openapi({ title: 'ROBLOX' }),
    z.literal('skype').openapi({ title: 'SKYPE' }),
    z.literal('spotify').openapi({ title: 'SPOTIFY' }),
    z.literal('steam').openapi({ title: 'STEAM' }),
    z.literal('tiktok').openapi({ title: 'TIKTOK' }),
    z.literal('twitch').openapi({ title: 'TWITCH' }),
    z.literal('twitter').openapi({ title: 'TWITTER' }),
    z.literal('xbox').openapi({ title: 'XBOX' }),
    z.literal('youtube').openapi({ title: 'YOUTUBE' }),
    z.literal('domain').openapi({ title: 'DOMAIN' }),
  ])
  .openapi('ConnectedAccountProviders')

const ConnectedAccountVisibilitySchema = z
  .xor([z.literal(0).openapi({ title: 'NONE' }), z.literal(1).openapi({ title: 'EVERYONE' })])
  .openapi('ConnectedAccountVisibility')

const ConnectedAccountResponseSchema = z
  .object({
    id: z.string(),
    name: z.string().nullable().exactOptional(),
    type: ConnectedAccountProvidersSchema,
    friend_sync: z.boolean(),
    integrations: z.array(ConnectedAccountIntegrationResponseSchema).exactOptional(),
    show_activity: z.boolean(),
    two_way_link: z.boolean(),
    verified: z.boolean(),
    visibility: ConnectedAccountVisibilitySchema,
    revoked: z.boolean().exactOptional(),
  })
  .openapi({
    required: [
      'id',
      'type',
      'friend_sync',
      'show_activity',
      'two_way_link',
      'verified',
      'visibility',
    ],
  })
  .openapi('ConnectedAccountResponse')

const EntitlementOwnerTypesSchema = z.any().openapi('EntitlementOwnerTypes')

const CreateEntitlementRequestDataSchema = z
  .object({
    sku_id: SnowflakeTypeSchema,
    owner_id: SnowflakeTypeSchema,
    owner_type: EntitlementOwnerTypesSchema,
  })
  .openapi({ required: ['sku_id', 'owner_id', 'owner_type'] })
  .openapi('CreateEntitlementRequestData')

const CreateForumThreadRequestSchema = z
  .object({
    name: z.string().min(1).max(100),
    auto_archive_duration: z
      .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
      .exactOptional(),
    rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
    applied_tags: z.array(SnowflakeTypeSchema).max(5).nullable().exactOptional(),
    message: BaseCreateMessageCreateRequestSchema,
  })
  .openapi({ required: ['name', 'message'] })
  .openapi('CreateForumThreadRequest')

const CreateGroupDMInviteRequestSchema = z
  .object({ max_age: z.int().min(1).max(604800).nullable().exactOptional() })
  .openapi('CreateGroupDMInviteRequest')

const UpdateDefaultReactionEmojiRequestSchema = z
  .object({
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().max(100).nullable().exactOptional(),
  })
  .openapi('UpdateDefaultReactionEmojiRequest')

const CreateOrUpdateThreadTagRequestSchema = z
  .object({
    name: z.string().min(0).max(50),
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().max(100).nullable().exactOptional(),
    moderated: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateOrUpdateThreadTagRequest')

const CreateGuildChannelRequestSchema = z
  .object({
    type: z.xor([z.null().nullable(), ChannelTypesSchema]).exactOptional(),
    name: z.string().min(1).max(100),
    position: z.int32().min(0).nullable().exactOptional(),
    topic: z.string().min(0).max(4096).nullable().exactOptional(),
    bitrate: z.int32().min(8000).nullable().exactOptional(),
    user_limit: z.int32().min(0).nullable().exactOptional(),
    nsfw: z.boolean().nullable().exactOptional(),
    rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
    parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    permission_overwrites: z
      .array(ChannelPermissionOverwriteRequestSchema)
      .max(100)
      .nullable()
      .exactOptional(),
    rtc_region: z.string().nullable().exactOptional(),
    video_quality_mode: z.xor([z.null().nullable(), VideoQualityModesSchema]).exactOptional(),
    default_auto_archive_duration: z
      .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
      .exactOptional(),
    default_reaction_emoji: z
      .xor([z.null().nullable(), UpdateDefaultReactionEmojiRequestSchema])
      .exactOptional(),
    default_thread_rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
    default_sort_order: z.xor([z.null().nullable(), ThreadSortOrderSchema]).exactOptional(),
    default_forum_layout: z.xor([z.null().nullable(), ForumLayoutSchema]).exactOptional(),
    default_tag_setting: z.xor([z.null().nullable(), ThreadSearchTagSettingSchema]).exactOptional(),
    available_tags: z
      .array(z.xor([z.null().nullable(), CreateOrUpdateThreadTagRequestSchema]))
      .max(20)
      .nullable()
      .exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateGuildChannelRequest')

const InviteTargetTypesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'STREAM' }),
    z.literal(2).openapi({ title: 'EMBEDDED_APPLICATION' }),
    z.literal(3).openapi({ title: 'ROLE_SUBSCRIPTIONS_PURCHASE' }),
  ])
  .openapi('InviteTargetTypes')

const CreateGuildInviteRequestSchema = z
  .object({
    max_age: z.int().min(0).max(5184000).nullable().exactOptional(),
    temporary: z.boolean().nullable().exactOptional(),
    max_uses: z.int().min(0).max(100).nullable().exactOptional(),
    unique: z.boolean().nullable().exactOptional(),
    target_user_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    target_application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    target_type: z.xor([z.null().nullable(), InviteTargetTypesSchema]).exactOptional(),
  })
  .openapi('CreateGuildInviteRequest')

const IncomingWebhookInteractionRequestSchema = z
  .object({
    content: z.string().max(2000).nullable().exactOptional(),
    embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
    allowed_mentions: z
      .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
      .exactOptional(),
    components: z
      .array(
        z.xor([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      )
      .max(40)
      .nullable()
      .exactOptional(),
    attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
    poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
    tts: z.boolean().nullable().exactOptional(),
    flags: z.int().nullable().exactOptional(),
  })
  .openapi('IncomingWebhookInteractionRequest')

const CreateMessageInteractionCallbackRequestSchema = z
  .object({
    type: InteractionCallbackTypesSchema,
    data: z.xor([z.null().nullable(), IncomingWebhookInteractionRequestSchema]).exactOptional(),
  })
  .openapi({ required: ['type'] })
  .openapi('CreateMessageInteractionCallbackRequest')

const CreatePrivateChannelRequestSchema = z
  .object({
    recipient_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    access_tokens: z.array(z.string().max(152133)).max(1521).nullable().exactOptional(),
    nicks: z
      .record(z.string(), z.string().max(152133).nullable())
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 1521 }),
  })
  .openapi('CreatePrivateChannelRequest')

const CreateRoleRequestSchema = z
  .object({
    name: z.string().max(100).nullable().exactOptional(),
    permissions: z.int().nullable().exactOptional(),
    color: z.int().min(0).max(16777215).nullable().exactOptional(),
    hoist: z.boolean().nullable().exactOptional(),
    mentionable: z.boolean().nullable().exactOptional(),
    icon: z.string().nullable().exactOptional(),
    unicode_emoji: z.string().max(100).nullable().exactOptional(),
  })
  .openapi('CreateRoleRequest')

const CreateTextThreadWithMessageRequestSchema = z
  .object({
    name: z.string().min(1).max(100),
    auto_archive_duration: z
      .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
      .exactOptional(),
    rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateTextThreadWithMessageRequest')

const CreateTextThreadWithoutMessageRequestSchema = z
  .object({
    name: z.string().min(1).max(100),
    auto_archive_duration: z
      .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
      .exactOptional(),
    rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
    type: z.xor([z.null().nullable(), ChannelTypesSchema]).exactOptional(),
    invitable: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateTextThreadWithoutMessageRequest')

const CreatedThreadResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    last_message_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    flags: z.int32(),
    last_pin_timestamp: z.iso.datetime().nullable().exactOptional(),
    guild_id: SnowflakeTypeSchema,
    name: z.string(),
    parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    rate_limit_per_user: z.int32().exactOptional(),
    bitrate: z.int32().exactOptional(),
    user_limit: z.int32().exactOptional(),
    rtc_region: z.string().nullable().exactOptional(),
    video_quality_mode: VideoQualityModesSchema.exactOptional(),
    permissions: z.string().nullable().exactOptional(),
    owner_id: SnowflakeTypeSchema,
    thread_metadata: ThreadMetadataResponseSchema,
    message_count: z.int32(),
    member_count: z.int32(),
    total_message_sent: z.int32(),
    applied_tags: z.array(SnowflakeTypeSchema).exactOptional(),
    member: ThreadMemberResponseSchema.exactOptional(),
  })
  .openapi({
    required: [
      'id',
      'type',
      'flags',
      'guild_id',
      'name',
      'owner_id',
      'thread_metadata',
      'message_count',
      'member_count',
      'total_message_sent',
    ],
  })
  .openapi('CreatedThreadResponse')

const DefaultKeywordListTriggerMetadataSchema = z
  .object({
    allow_list: z.array(z.string().min(1).max(60)).max(1000).nullable().exactOptional(),
    presets: z.array(AutomodKeywordPresetTypeSchema).nullable().exactOptional(),
  })
  .openapi('DefaultKeywordListTriggerMetadata')

const DefaultKeywordListTriggerMetadataResponseSchema = z
  .object({ allow_list: z.array(z.string()), presets: z.array(AutomodKeywordPresetTypeSchema) })
  .openapi({ required: ['allow_list', 'presets'] })
  .openapi('DefaultKeywordListTriggerMetadataResponse')

const FlagToChannelActionMetadataSchema = z
  .object({ channel_id: SnowflakeTypeSchema })
  .openapi({ required: ['channel_id'] })
  .openapi('FlagToChannelActionMetadata')

const FlagToChannelActionSchema = z
  .object({ type: AutomodActionTypeSchema, metadata: FlagToChannelActionMetadataSchema })
  .openapi({ required: ['type', 'metadata'] })
  .openapi('FlagToChannelAction')

const QuarantineUserActionMetadataSchema = z.object({}).openapi('QuarantineUserActionMetadata')

const QuarantineUserActionSchema = z
  .object({
    type: AutomodActionTypeSchema,
    metadata: z.xor([z.null().nullable(), QuarantineUserActionMetadataSchema]).exactOptional(),
  })
  .openapi({ required: ['type'] })
  .openapi('QuarantineUserAction')

const UserCommunicationDisabledActionMetadataSchema = z
  .object({ duration_seconds: z.int().min(0).max(2419200).nullable().exactOptional() })
  .openapi('UserCommunicationDisabledActionMetadata')

const UserCommunicationDisabledActionSchema = z
  .object({
    type: AutomodActionTypeSchema,
    metadata: UserCommunicationDisabledActionMetadataSchema,
  })
  .openapi({ required: ['type', 'metadata'] })
  .openapi('UserCommunicationDisabledAction')

const DefaultKeywordListUpsertRequestSchema = z
  .object({
    name: z.string().max(100),
    event_type: AutomodEventTypeSchema,
    actions: z
      .array(
        z.xor([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      )
      .min(1)
      .max(5)
      .nullable()
      .exactOptional(),
    enabled: z.boolean().nullable().exactOptional(),
    exempt_roles: z.array(SnowflakeTypeSchema).max(20).nullable().exactOptional(),
    exempt_channels: z.array(SnowflakeTypeSchema).max(50).nullable().exactOptional(),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: DefaultKeywordListTriggerMetadataSchema,
  })
  .openapi({ required: ['name', 'event_type', 'trigger_type', 'trigger_metadata'] })
  .openapi('DefaultKeywordListUpsertRequest')

const DefaultKeywordListUpsertRequestPartialSchema = z
  .object({
    name: z.string().max(100).exactOptional(),
    event_type: AutomodEventTypeSchema.exactOptional(),
    actions: z
      .array(
        z.xor([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      )
      .min(1)
      .max(5)
      .nullable()
      .exactOptional(),
    enabled: z.boolean().nullable().exactOptional(),
    exempt_roles: z.array(SnowflakeTypeSchema).max(20).nullable().exactOptional(),
    exempt_channels: z.array(SnowflakeTypeSchema).max(50).nullable().exactOptional(),
    trigger_type: AutomodTriggerTypeSchema.exactOptional(),
    trigger_metadata: DefaultKeywordListTriggerMetadataSchema.exactOptional(),
  })
  .openapi('DefaultKeywordListUpsertRequestPartial')

const FlagToChannelActionMetadataResponseSchema = z
  .object({ channel_id: SnowflakeTypeSchema })
  .openapi({ required: ['channel_id'] })
  .openapi('FlagToChannelActionMetadataResponse')

const FlagToChannelActionResponseSchema = z
  .object({ type: AutomodActionTypeSchema, metadata: FlagToChannelActionMetadataResponseSchema })
  .openapi({ required: ['type', 'metadata'] })
  .openapi('FlagToChannelActionResponse')

const QuarantineUserActionMetadataResponseSchema = z
  .object({})
  .openapi('QuarantineUserActionMetadataResponse')

const QuarantineUserActionResponseSchema = z
  .object({ type: AutomodActionTypeSchema, metadata: QuarantineUserActionMetadataResponseSchema })
  .openapi({ required: ['type', 'metadata'] })
  .openapi('QuarantineUserActionResponse')

const UserCommunicationDisabledActionMetadataResponseSchema = z
  .object({ duration_seconds: z.int32() })
  .openapi({ required: ['duration_seconds'] })
  .openapi('UserCommunicationDisabledActionMetadataResponse')

const UserCommunicationDisabledActionResponseSchema = z
  .object({
    type: AutomodActionTypeSchema,
    metadata: UserCommunicationDisabledActionMetadataResponseSchema,
  })
  .openapi({ required: ['type', 'metadata'] })
  .openapi('UserCommunicationDisabledActionResponse')

const DefaultKeywordRuleResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    creator_id: SnowflakeTypeSchema,
    name: z.string(),
    event_type: AutomodEventTypeSchema,
    actions: z.array(
      z.xor([
        BlockMessageActionResponseSchema,
        FlagToChannelActionResponseSchema,
        QuarantineUserActionResponseSchema,
        UserCommunicationDisabledActionResponseSchema,
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    enabled: z.boolean(),
    exempt_roles: z.array(SnowflakeTypeSchema),
    exempt_channels: z.array(SnowflakeTypeSchema),
    trigger_metadata: DefaultKeywordListTriggerMetadataResponseSchema,
  })
  .openapi({
    required: [
      'id',
      'guild_id',
      'creator_id',
      'name',
      'event_type',
      'actions',
      'trigger_type',
      'enabled',
      'exempt_roles',
      'exempt_channels',
      'trigger_metadata',
    ],
  })
  .openapi('DefaultKeywordRuleResponse')

const IntegrationApplicationResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    icon: z.string().nullable().exactOptional(),
    description: z.string(),
    type: z.xor([z.null().nullable(), ApplicationTypesSchema]).exactOptional(),
    cover_image: z.string().exactOptional(),
    primary_sku_id: SnowflakeTypeSchema.exactOptional(),
    bot: UserResponseSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'description'] })
  .openapi('IntegrationApplicationResponse')

const DiscordIntegrationResponseSchema = z
  .object({
    type: IntegrationTypesSchema,
    name: z.string().nullable().exactOptional(),
    account: AccountResponseSchema,
    enabled: z.boolean(),
    id: SnowflakeTypeSchema,
    application: IntegrationApplicationResponseSchema,
    scopes: z.array(OAuth2ScopesSchema),
    user: UserResponseSchema.exactOptional(),
  })
  .openapi({ required: ['type', 'account', 'enabled', 'id', 'application', 'scopes'] })
  .openapi('DiscordIntegrationResponse')

const EmbeddedActivityLocationKindSchema = z
  .xor([
    z.literal('gc').openapi({ title: 'GUILD_CHANNEL', description: 'guild channel' }),
    z.literal('pc').openapi({ title: 'PRIVATE_CHANNEL', description: 'private channel' }),
    z.literal('party').openapi({ title: 'PARTY', description: 'party' }),
  ])
  .openapi('EmbeddedActivityLocationKind')

const GuildChannelLocationSchema = z
  .object({
    id: z.string(),
    kind: EmbeddedActivityLocationKindSchema,
    channel_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
  })
  .openapi({ required: ['id', 'kind', 'channel_id', 'guild_id'] })
  .openapi('GuildChannelLocation')

const PrivateChannelLocationSchema = z
  .object({
    id: z.string(),
    kind: EmbeddedActivityLocationKindSchema,
    channel_id: SnowflakeTypeSchema,
  })
  .openapi({ required: ['id', 'kind', 'channel_id'] })
  .openapi('PrivateChannelLocation')

const EmbeddedActivityInstanceSchema = z
  .object({
    application_id: SnowflakeTypeSchema,
    instance_id: z.string(),
    launch_id: z.string(),
    location: z.xor([GuildChannelLocationSchema, PrivateChannelLocationSchema]),
    users: z.array(SnowflakeTypeSchema),
  })
  .openapi({ required: ['application_id', 'instance_id', 'launch_id', 'location', 'users'] })
  .openapi('EmbeddedActivityInstance')

const EmojiResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    user: UserResponseSchema.exactOptional(),
    roles: z.array(SnowflakeTypeSchema),
    require_colons: z.boolean(),
    managed: z.boolean(),
    animated: z.boolean(),
    available: z.boolean(),
  })
  .openapi({
    required: ['id', 'name', 'roles', 'require_colons', 'managed', 'animated', 'available'],
  })
  .openapi('EmojiResponse')

const EntitlementTypesSchema = z
  .xor([
    z.literal(8).openapi({ title: 'APPLICATION_SUBSCRIPTION' }),
    z.literal(10).openapi({ title: 'QUEST_REWARD' }),
  ])
  .openapi('EntitlementTypes')

const EntitlementTenantFulfillmentStatusResponseSchema = z
  .xor([
    z.literal(0).openapi({ title: 'UNKNOWN' }),
    z.literal(1).openapi({ title: 'FULFILLMENT_NOT_NEEDED' }),
    z.literal(2).openapi({ title: 'FULFILLMENT_NEEDED' }),
    z.literal(3).openapi({ title: 'FULFILLED' }),
    z.literal(4).openapi({ title: 'FULFILLMENT_FAILED' }),
    z.literal(5).openapi({ title: 'UNFULFILLMENT_NEEDED' }),
    z.literal(6).openapi({ title: 'UNFULFILLED' }),
    z.literal(7).openapi({ title: 'UNFULFILLMENT_FAILED' }),
  ])
  .openapi('EntitlementTenantFulfillmentStatusResponse')

const EntitlementResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    sku_id: SnowflakeTypeSchema,
    application_id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
    guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    deleted: z.boolean(),
    starts_at: z.iso.datetime().nullable().exactOptional(),
    ends_at: z.iso.datetime().nullable().exactOptional(),
    type: EntitlementTypesSchema,
    fulfilled_at: z.iso.datetime().nullable().exactOptional(),
    fulfillment_status: z
      .xor([z.null().nullable(), EntitlementTenantFulfillmentStatusResponseSchema])
      .exactOptional(),
    consumed: z.boolean().nullable().exactOptional(),
    gifter_user_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  })
  .openapi({ required: ['id', 'sku_id', 'application_id', 'user_id', 'deleted', 'type'] })
  .openapi('EntitlementResponse')

const EntityMetadataExternalSchema = z
  .object({ location: z.string().max(100) })
  .openapi({ required: ['location'] })
  .openapi('EntityMetadataExternal')

const EntityMetadataExternalResponseSchema = z
  .object({ location: z.string() })
  .openapi({ required: ['location'] })
  .openapi('EntityMetadataExternalResponse')

const EntityMetadataStageInstanceSchema = z.object({}).openapi('EntityMetadataStageInstance')

const EntityMetadataStageInstanceResponseSchema = z
  .object({})
  .openapi('EntityMetadataStageInstanceResponse')

const EntityMetadataVoiceSchema = z.object({}).openapi('EntityMetadataVoice')

const EntityMetadataVoiceResponseSchema = z.object({}).openapi('EntityMetadataVoiceResponse')

const IntegrationExpireBehaviorTypesSchema = z
  .xor([
    z.literal(0).openapi({ title: 'REMOVE_ROLE', description: 'Remove role' }),
    z.literal(1).openapi({ title: 'KICK', description: 'Kick' }),
  ])
  .openapi('IntegrationExpireBehaviorTypes')

const IntegrationExpireGracePeriodTypesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'ONE_DAY', description: '1 day' }),
    z.literal(3).openapi({ title: 'THREE_DAYS', description: '3 days' }),
    z.literal(7).openapi({ title: 'SEVEN_DAYS', description: '7 days' }),
    z.literal(14).openapi({ title: 'FOURTEEN_DAYS', description: '14 days' }),
    z.literal(30).openapi({ title: 'THIRTY_DAYS', description: '30 days' }),
  ])
  .openapi('IntegrationExpireGracePeriodTypes')

const ExternalConnectionIntegrationResponseSchema = z
  .object({
    type: IntegrationTypesSchema,
    name: z.string().nullable().exactOptional(),
    account: AccountResponseSchema,
    enabled: z.boolean(),
    id: z.string(),
    user: UserResponseSchema,
    revoked: z.boolean().exactOptional(),
    expire_behavior: IntegrationExpireBehaviorTypesSchema.exactOptional(),
    expire_grace_period: IntegrationExpireGracePeriodTypesSchema.exactOptional(),
    subscriber_count: z.int32().exactOptional(),
    synced_at: z.iso.datetime().exactOptional(),
    role_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    syncing: z.boolean().exactOptional(),
    enable_emoticons: z.boolean().exactOptional(),
  })
  .openapi({ required: ['type', 'account', 'enabled', 'id', 'user'] })
  .openapi('ExternalConnectionIntegrationResponse')

const GuildScheduledEventPrivacyLevelsSchema = z
  .xor([
    z
      .literal(2)
      .openapi({
        title: 'GUILD_ONLY',
        description: 'the scheduled event is only accessible to guild members',
      }),
  ])
  .openapi('GuildScheduledEventPrivacyLevels')

const GuildScheduledEventEntityTypesSchema = z
  .xor([
    z.literal(0).openapi({ title: 'NONE' }),
    z.literal(1).openapi({ title: 'STAGE_INSTANCE' }),
    z.literal(2).openapi({ title: 'VOICE' }),
    z.literal(3).openapi({ title: 'EXTERNAL' }),
  ])
  .openapi('GuildScheduledEventEntityTypes')

const RecurrenceRuleFrequenciesSchema = z
  .xor([
    z.literal(3).openapi({ title: 'DAILY' }),
    z.literal(2).openapi({ title: 'WEEKLY' }),
    z.literal(1).openapi({ title: 'MONTHLY' }),
    z.literal(0).openapi({ title: 'YEARLY' }),
  ])
  .openapi('RecurrenceRuleFrequencies')

const RecurrenceRuleMonthsSchema = z
  .xor([
    z.literal(1).openapi({ title: 'JANUARY' }),
    z.literal(2).openapi({ title: 'FEBURARY' }),
    z.literal(3).openapi({ title: 'MARCH' }),
    z.literal(4).openapi({ title: 'APRIL' }),
    z.literal(5).openapi({ title: 'MAY' }),
    z.literal(6).openapi({ title: 'JUNE' }),
    z.literal(7).openapi({ title: 'JULY' }),
    z.literal(8).openapi({ title: 'AUGUEST' }),
    z.literal(9).openapi({ title: 'SEPTEMBER' }),
    z.literal(10).openapi({ title: 'OCTOBER' }),
    z.literal(11).openapi({ title: 'NOVEMBER' }),
    z.literal(12).openapi({ title: 'DECEMBER' }),
  ])
  .openapi('RecurrenceRuleMonths')

const RecurrenceRuleSchema = z
  .object({
    start: z.iso.datetime(),
    end: z.iso.datetime().nullable().exactOptional(),
    frequency: RecurrenceRuleFrequenciesSchema,
    interval: z.int32().nullable().exactOptional(),
    by_weekday: z.array(RecurrenceRuleWeekdaysSchema).max(7).nullable().exactOptional(),
    by_n_weekday: z.array(ByNWeekdaySchema).max(7).nullable().exactOptional(),
    by_month: z.array(RecurrenceRuleMonthsSchema).max(12).nullable().exactOptional(),
    by_month_day: z.array(z.int32().min(-1).max(31)).max(33).nullable().exactOptional(),
    by_year_day: z.array(z.int32().min(-1).max(365)).max(367).nullable().exactOptional(),
    count: z.int32().nullable().exactOptional(),
  })
  .openapi({ required: ['start', 'frequency'] })
  .openapi('RecurrenceRule')

const ExternalScheduledEventCreateRequestSchema = z
  .object({
    name: z.string().max(100),
    description: z.string().max(1000).nullable().exactOptional(),
    image: z.string().nullable().exactOptional(),
    scheduled_start_time: z.iso.datetime(),
    scheduled_end_time: z.iso.datetime().nullable().exactOptional(),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    recurrence_rule: z.xor([z.null().nullable(), RecurrenceRuleSchema]).exactOptional(),
    entity_metadata: EntityMetadataExternalSchema,
  })
  .openapi({
    required: ['name', 'scheduled_start_time', 'privacy_level', 'entity_type', 'entity_metadata'],
  })
  .openapi('ExternalScheduledEventCreateRequest')

const GuildScheduledEventStatusesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'SCHEDULED' }),
    z.literal(2).openapi({ title: 'ACTIVE' }),
    z.literal(3).openapi({ title: 'COMPLETED' }),
    z.literal(4).openapi({ title: 'CANCELED' }),
  ])
  .openapi('GuildScheduledEventStatuses')

const ExternalScheduledEventPatchRequestPartialSchema = z
  .object({
    status: z.xor([z.null().nullable(), GuildScheduledEventStatusesSchema]).exactOptional(),
    name: z.string().max(100).exactOptional(),
    description: z.string().max(1000).nullable().exactOptional(),
    image: z.string().nullable().exactOptional(),
    scheduled_start_time: z.iso.datetime().exactOptional(),
    scheduled_end_time: z.iso.datetime().nullable().exactOptional(),
    entity_type: z.xor([z.null().nullable(), GuildScheduledEventEntityTypesSchema]).exactOptional(),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema.exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    recurrence_rule: z.xor([z.null().nullable(), RecurrenceRuleSchema]).exactOptional(),
    entity_metadata: EntityMetadataExternalSchema.exactOptional(),
  })
  .openapi('ExternalScheduledEventPatchRequestPartial')

const RecurrenceRuleResponseSchema = z
  .object({
    start: z.iso.datetime(),
    end: z.iso.datetime().nullable().exactOptional(),
    frequency: RecurrenceRuleFrequenciesSchema,
    interval: z.int32().nullable().exactOptional(),
    by_weekday: z.array(RecurrenceRuleWeekdaysSchema).nullable().exactOptional(),
    by_n_weekday: z.array(ByNWeekdayResponseSchema).nullable().exactOptional(),
    by_month: z.array(RecurrenceRuleMonthsSchema).nullable().exactOptional(),
    by_month_day: z.array(z.int32()).nullable().exactOptional(),
    by_year_day: z.array(z.int32()).nullable().exactOptional(),
    count: z.int32().nullable().exactOptional(),
  })
  .openapi({ required: ['start', 'frequency'] })
  .openapi('RecurrenceRuleResponse')

const GuildScheduledEventUserResponsesSchema = z
  .xor([
    z.literal(0).openapi({ title: 'UNINTERESTED' }),
    z.literal(1).openapi({ title: 'INTERESTED' }),
  ])
  .openapi('GuildScheduledEventUserResponses')

const ScheduledEventUserResponseSchema = z
  .object({
    guild_scheduled_event_id: SnowflakeTypeSchema,
    guild_scheduled_event_exception_id: z
      .xor([z.null().nullable(), SnowflakeTypeSchema])
      .exactOptional(),
    user_id: SnowflakeTypeSchema,
    user: UserResponseSchema.exactOptional(),
    member: GuildMemberResponseSchema.exactOptional(),
    response: GuildScheduledEventUserResponsesSchema,
  })
  .openapi({ required: ['guild_scheduled_event_id', 'user_id', 'response'] })
  .openapi('ScheduledEventUserResponse')

const ExternalScheduledEventResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    name: z.string(),
    description: z.string().nullable().exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    creator_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    creator: UserResponseSchema.exactOptional(),
    image: z.string().nullable().exactOptional(),
    scheduled_start_time: z.iso.datetime(),
    scheduled_end_time: z.iso.datetime().nullable().exactOptional(),
    status: GuildScheduledEventStatusesSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    entity_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    recurrence_rule: z.xor([z.null().nullable(), RecurrenceRuleResponseSchema]).exactOptional(),
    user_count: z.int32().exactOptional(),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    user_rsvp: z.xor([z.null().nullable(), ScheduledEventUserResponseSchema]).exactOptional(),
    entity_metadata: EntityMetadataExternalResponseSchema,
  })
  .openapi({
    required: [
      'id',
      'guild_id',
      'name',
      'scheduled_start_time',
      'status',
      'entity_type',
      'privacy_level',
      'entity_metadata',
    ],
  })
  .openapi('ExternalScheduledEventResponse')

const FileUploadComponentForModalRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    min_values: z.int().min(0).max(10).nullable().exactOptional(),
    max_values: z.int().min(1).max(10).nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'custom_id'] })
  .openapi('FileUploadComponentForModalRequest')

const InviteTypesSchema = z
  .xor([
    z.literal(0).openapi({ title: 'GUILD' }),
    z.literal(1).openapi({ title: 'GROUP_DM' }),
    z.literal(2).openapi({ title: 'FRIEND' }),
  ])
  .openapi('InviteTypes')

const InviteChannelRecipientResponseSchema = z
  .object({ username: z.string() })
  .openapi({ required: ['username'] })
  .openapi('InviteChannelRecipientResponse')

const InviteChannelResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    name: z.string().nullable().exactOptional(),
    icon: z.string().exactOptional(),
    recipients: z.array(InviteChannelRecipientResponseSchema).exactOptional(),
  })
  .openapi({ required: ['id', 'type'] })
  .openapi('InviteChannelResponse')

const FriendInviteResponseSchema = z
  .object({
    type: InviteTypesSchema,
    code: z.string(),
    inviter: UserResponseSchema.exactOptional(),
    max_age: z.int32().exactOptional(),
    created_at: z.iso.datetime().exactOptional(),
    expires_at: z.iso.datetime().nullable().exactOptional(),
    friends_count: z.int32().exactOptional(),
    channel: z.xor([z.null().nullable(), InviteChannelResponseSchema]).exactOptional(),
    is_contact: z.boolean().exactOptional(),
    uses: z.int32().exactOptional(),
    max_uses: z.int32().exactOptional(),
    flags: z.int32().exactOptional(),
  })
  .openapi({ required: ['type', 'code'] })
  .openapi('FriendInviteResponse')

const GatewayBotSessionStartLimitResponseSchema = z
  .object({
    max_concurrency: z.int32(),
    remaining: z.int32(),
    reset_after: z.int32(),
    total: z.int32(),
  })
  .openapi({ required: ['max_concurrency', 'remaining', 'reset_after', 'total'] })
  .openapi('GatewayBotSessionStartLimitResponse')

const GatewayBotResponseSchema = z
  .object({
    url: z.url(),
    session_start_limit: GatewayBotSessionStartLimitResponseSchema,
    shards: z.int32(),
  })
  .openapi({ required: ['url', 'session_start_limit', 'shards'] })
  .openapi('GatewayBotResponse')

const GatewayResponseSchema = z
  .object({ url: z.url() })
  .openapi({ required: ['url'] })
  .openapi('GatewayResponse')

const GithubAuthorSchema = z
  .object({
    username: z.string().max(152133).nullable().exactOptional(),
    name: z.string().max(152133),
  })
  .openapi({ required: ['name'] })
  .openapi('GithubAuthor')

const GithubCheckAppSchema = z
  .object({ name: z.string().max(152133) })
  .openapi({ required: ['name'] })
  .openapi('GithubCheckApp')

const GithubCheckPullRequestSchema = z
  .object({ number: z.int() })
  .openapi({ required: ['number'] })
  .openapi('GithubCheckPullRequest')

const GithubCheckSuiteSchema = z
  .object({
    conclusion: z.string().max(152133).nullable().exactOptional(),
    head_branch: z.string().max(152133).nullable().exactOptional(),
    head_sha: z.string().max(152133),
    pull_requests: z.array(GithubCheckPullRequestSchema).max(1521).nullable().exactOptional(),
    app: GithubCheckAppSchema,
  })
  .openapi({ required: ['head_sha', 'app'] })
  .openapi('GithubCheckSuite')

const GithubCheckRunOutputSchema = z
  .object({
    title: z.string().max(152133).nullable().exactOptional(),
    summary: z.string().max(152133).nullable().exactOptional(),
  })
  .openapi('GithubCheckRunOutput')

const GithubCheckRunSchema = z
  .object({
    conclusion: z.string().max(152133).nullable().exactOptional(),
    name: z.string().max(152133),
    html_url: z.url().max(2048),
    check_suite: GithubCheckSuiteSchema,
    details_url: z.url().max(2048).nullable().exactOptional(),
    output: z.xor([z.null().nullable(), GithubCheckRunOutputSchema]).exactOptional(),
    pull_requests: z.array(GithubCheckPullRequestSchema).max(1521).nullable().exactOptional(),
  })
  .openapi({ required: ['name', 'html_url', 'check_suite'] })
  .openapi('GithubCheckRun')

const GithubUserSchema = z
  .object({
    id: z.int(),
    login: z.string().max(152133),
    html_url: z.url().max(2048),
    avatar_url: z.url().max(2048),
  })
  .openapi({ required: ['id', 'login', 'html_url', 'avatar_url'] })
  .openapi('GithubUser')

const GithubCommentSchema = z
  .object({
    id: z.int(),
    html_url: z.url().max(2048),
    user: GithubUserSchema,
    commit_id: z.string().max(152133).nullable().exactOptional(),
    body: z.string().max(152133),
  })
  .openapi({ required: ['id', 'html_url', 'user', 'body'] })
  .openapi('GithubComment')

const GithubCommitSchema = z
  .object({
    id: z.string().max(152133),
    url: z.url().max(2048),
    message: z.string().max(152133),
    author: GithubAuthorSchema,
  })
  .openapi({ required: ['id', 'url', 'message', 'author'] })
  .openapi('GithubCommit')

const GithubDiscussionSchema = z
  .object({
    title: z.string().max(152133),
    number: z.int(),
    html_url: z.url().max(2048),
    answer_html_url: z.url().max(2048).nullable().exactOptional(),
    body: z.string().max(152133).nullable().exactOptional(),
    user: GithubUserSchema,
  })
  .openapi({ required: ['title', 'number', 'html_url', 'user'] })
  .openapi('GithubDiscussion')

const GithubIssueSchema = z
  .object({
    id: z.int(),
    number: z.int(),
    html_url: z.url().max(2048),
    user: GithubUserSchema,
    title: z.string().max(152133),
    body: z.string().max(152133).nullable().exactOptional(),
    pull_request: z.any().exactOptional(),
  })
  .openapi({ required: ['id', 'number', 'html_url', 'user', 'title'] })
  .openapi('GithubIssue')

const GithubReleaseSchema = z
  .object({
    id: z.int(),
    tag_name: z.string().max(152133),
    html_url: z.url().max(2048),
    author: GithubUserSchema,
  })
  .openapi({ required: ['id', 'tag_name', 'html_url', 'author'] })
  .openapi('GithubRelease')

const GithubRepositorySchema = z
  .object({
    id: z.int(),
    html_url: z.url().max(2048),
    name: z.string().max(152133),
    full_name: z.string().max(152133),
  })
  .openapi({ required: ['id', 'html_url', 'name', 'full_name'] })
  .openapi('GithubRepository')

const GithubReviewSchema = z
  .object({
    user: GithubUserSchema,
    body: z.string().max(152133).nullable().exactOptional(),
    html_url: z.url().max(2048),
    state: z.string().max(152133),
  })
  .openapi({ required: ['user', 'html_url', 'state'] })
  .openapi('GithubReview')

const GithubWebhookSchema = z
  .object({
    action: z.string().max(152133).nullable().exactOptional(),
    ref: z.string().max(152133).nullable().exactOptional(),
    ref_type: z.string().max(152133).nullable().exactOptional(),
    comment: z.xor([z.null().nullable(), GithubCommentSchema]).exactOptional(),
    issue: z.xor([z.null().nullable(), GithubIssueSchema]).exactOptional(),
    pull_request: z.xor([z.null().nullable(), GithubIssueSchema]).exactOptional(),
    repository: z.xor([z.null().nullable(), GithubRepositorySchema]).exactOptional(),
    forkee: z.xor([z.null().nullable(), GithubRepositorySchema]).exactOptional(),
    sender: GithubUserSchema,
    member: z.xor([z.null().nullable(), GithubUserSchema]).exactOptional(),
    release: z.xor([z.null().nullable(), GithubReleaseSchema]).exactOptional(),
    head_commit: z.xor([z.null().nullable(), GithubCommitSchema]).exactOptional(),
    commits: z.array(GithubCommitSchema).max(1521).nullable().exactOptional(),
    forced: z.boolean().nullable().exactOptional(),
    compare: z.url().max(2048).nullable().exactOptional(),
    review: z.xor([z.null().nullable(), GithubReviewSchema]).exactOptional(),
    check_run: z.xor([z.null().nullable(), GithubCheckRunSchema]).exactOptional(),
    check_suite: z.xor([z.null().nullable(), GithubCheckSuiteSchema]).exactOptional(),
    discussion: z.xor([z.null().nullable(), GithubDiscussionSchema]).exactOptional(),
    answer: z.xor([z.null().nullable(), GithubCommentSchema]).exactOptional(),
  })
  .openapi({ required: ['sender'] })
  .openapi('GithubWebhook')

const GroupDMInviteResponseSchema = z
  .object({
    type: InviteTypesSchema,
    code: z.string(),
    inviter: UserResponseSchema.exactOptional(),
    max_age: z.int32().exactOptional(),
    created_at: z.iso.datetime().exactOptional(),
    expires_at: z.iso.datetime().nullable().exactOptional(),
    channel: InviteChannelResponseSchema,
    approximate_member_count: z.int32().nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'code', 'channel'] })
  .openapi('GroupDMInviteResponse')

const PartialDiscordIntegrationResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: IntegrationTypesSchema,
    name: z.string().nullable().exactOptional(),
    account: AccountResponseSchema,
    application_id: SnowflakeTypeSchema,
  })
  .openapi({ required: ['id', 'type', 'account', 'application_id'] })
  .openapi('PartialDiscordIntegrationResponse')

const PartialExternalConnectionIntegrationResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: IntegrationTypesSchema,
    name: z.string().nullable().exactOptional(),
    account: AccountResponseSchema,
  })
  .openapi({ required: ['id', 'type', 'account'] })
  .openapi('PartialExternalConnectionIntegrationResponse')

const PartialGuildSubscriptionIntegrationResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: IntegrationTypesSchema,
    name: z.string().nullable().exactOptional(),
    account: AccountResponseSchema,
  })
  .openapi({ required: ['id', 'type', 'account'] })
  .openapi('PartialGuildSubscriptionIntegrationResponse')

const GuildIncomingWebhookResponseSchema = z
  .object({
    application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    avatar: z.string().nullable().exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    id: SnowflakeTypeSchema,
    name: z.string(),
    type: WebhookTypesSchema,
    user: UserResponseSchema.exactOptional(),
    token: z.string().exactOptional(),
    url: z.url().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'type'] })
  .openapi('GuildIncomingWebhookResponse')

const StageScheduledEventResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    name: z.string(),
    description: z.string().nullable().exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    creator_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    creator: UserResponseSchema.exactOptional(),
    image: z.string().nullable().exactOptional(),
    scheduled_start_time: z.iso.datetime(),
    scheduled_end_time: z.iso.datetime().nullable().exactOptional(),
    status: GuildScheduledEventStatusesSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    entity_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    recurrence_rule: z.xor([z.null().nullable(), RecurrenceRuleResponseSchema]).exactOptional(),
    user_count: z.int32().exactOptional(),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    user_rsvp: z.xor([z.null().nullable(), ScheduledEventUserResponseSchema]).exactOptional(),
    entity_metadata: z
      .xor([z.null().nullable(), EntityMetadataStageInstanceResponseSchema])
      .exactOptional(),
  })
  .openapi({
    required: [
      'id',
      'guild_id',
      'name',
      'scheduled_start_time',
      'status',
      'entity_type',
      'privacy_level',
    ],
  })
  .openapi('StageScheduledEventResponse')

const VoiceScheduledEventResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    name: z.string(),
    description: z.string().nullable().exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    creator_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    creator: UserResponseSchema.exactOptional(),
    image: z.string().nullable().exactOptional(),
    scheduled_start_time: z.iso.datetime(),
    scheduled_end_time: z.iso.datetime().nullable().exactOptional(),
    status: GuildScheduledEventStatusesSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    entity_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    recurrence_rule: z.xor([z.null().nullable(), RecurrenceRuleResponseSchema]).exactOptional(),
    user_count: z.int32().exactOptional(),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    user_rsvp: z.xor([z.null().nullable(), ScheduledEventUserResponseSchema]).exactOptional(),
    entity_metadata: z
      .xor([z.null().nullable(), EntityMetadataVoiceResponseSchema])
      .exactOptional(),
  })
  .openapi({
    required: [
      'id',
      'guild_id',
      'name',
      'scheduled_start_time',
      'status',
      'entity_type',
      'privacy_level',
    ],
  })
  .openapi('VoiceScheduledEventResponse')

const KeywordTriggerMetadataResponseSchema = z
  .object({
    keyword_filter: z.array(z.string()),
    regex_patterns: z.array(z.string()),
    allow_list: z.array(z.string()),
  })
  .openapi({ required: ['keyword_filter', 'regex_patterns', 'allow_list'] })
  .openapi('KeywordTriggerMetadataResponse')

const KeywordRuleResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    creator_id: SnowflakeTypeSchema,
    name: z.string(),
    event_type: AutomodEventTypeSchema,
    actions: z.array(
      z.xor([
        BlockMessageActionResponseSchema,
        FlagToChannelActionResponseSchema,
        QuarantineUserActionResponseSchema,
        UserCommunicationDisabledActionResponseSchema,
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    enabled: z.boolean(),
    exempt_roles: z.array(SnowflakeTypeSchema),
    exempt_channels: z.array(SnowflakeTypeSchema),
    trigger_metadata: KeywordTriggerMetadataResponseSchema,
  })
  .openapi({
    required: [
      'id',
      'guild_id',
      'creator_id',
      'name',
      'event_type',
      'actions',
      'trigger_type',
      'enabled',
      'exempt_roles',
      'exempt_channels',
      'trigger_metadata',
    ],
  })
  .openapi('KeywordRuleResponse')

const MLSpamTriggerMetadataResponseSchema = z.object({}).openapi('MLSpamTriggerMetadataResponse')

const MLSpamRuleResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    creator_id: SnowflakeTypeSchema,
    name: z.string(),
    event_type: AutomodEventTypeSchema,
    actions: z.array(
      z.xor([
        BlockMessageActionResponseSchema,
        FlagToChannelActionResponseSchema,
        QuarantineUserActionResponseSchema,
        UserCommunicationDisabledActionResponseSchema,
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    enabled: z.boolean(),
    exempt_roles: z.array(SnowflakeTypeSchema),
    exempt_channels: z.array(SnowflakeTypeSchema),
    trigger_metadata: MLSpamTriggerMetadataResponseSchema,
  })
  .openapi({
    required: [
      'id',
      'guild_id',
      'creator_id',
      'name',
      'event_type',
      'actions',
      'trigger_type',
      'enabled',
      'exempt_roles',
      'exempt_channels',
      'trigger_metadata',
    ],
  })
  .openapi('MLSpamRuleResponse')

const MentionSpamTriggerMetadataResponseSchema = z
  .object({ mention_total_limit: z.int32(), mention_raid_protection_enabled: z.boolean() })
  .openapi({ required: ['mention_total_limit', 'mention_raid_protection_enabled'] })
  .openapi('MentionSpamTriggerMetadataResponse')

const MentionSpamRuleResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    creator_id: SnowflakeTypeSchema,
    name: z.string(),
    event_type: AutomodEventTypeSchema,
    actions: z.array(
      z.xor([
        BlockMessageActionResponseSchema,
        FlagToChannelActionResponseSchema,
        QuarantineUserActionResponseSchema,
        UserCommunicationDisabledActionResponseSchema,
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    enabled: z.boolean(),
    exempt_roles: z.array(SnowflakeTypeSchema),
    exempt_channels: z.array(SnowflakeTypeSchema),
    trigger_metadata: MentionSpamTriggerMetadataResponseSchema,
  })
  .openapi({
    required: [
      'id',
      'guild_id',
      'creator_id',
      'name',
      'event_type',
      'actions',
      'trigger_type',
      'enabled',
      'exempt_roles',
      'exempt_channels',
      'trigger_metadata',
    ],
  })
  .openapi('MentionSpamRuleResponse')

const SpamLinkTriggerMetadataResponseSchema = z
  .object({})
  .openapi('SpamLinkTriggerMetadataResponse')

const SpamLinkRuleResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    creator_id: SnowflakeTypeSchema,
    name: z.string(),
    event_type: AutomodEventTypeSchema,
    actions: z.array(
      z.xor([
        BlockMessageActionResponseSchema,
        FlagToChannelActionResponseSchema,
        QuarantineUserActionResponseSchema,
        UserCommunicationDisabledActionResponseSchema,
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    enabled: z.boolean(),
    exempt_roles: z.array(SnowflakeTypeSchema),
    exempt_channels: z.array(SnowflakeTypeSchema),
    trigger_metadata: SpamLinkTriggerMetadataResponseSchema,
  })
  .openapi({
    required: [
      'id',
      'guild_id',
      'creator_id',
      'name',
      'event_type',
      'actions',
      'trigger_type',
      'enabled',
      'exempt_roles',
      'exempt_channels',
      'trigger_metadata',
    ],
  })
  .openapi('SpamLinkRuleResponse')

const GuildAuditLogResponseSchema = z
  .object({
    audit_log_entries: z.array(AuditLogEntryResponseSchema),
    users: z.array(UserResponseSchema),
    integrations: z.array(
      z.xor([
        PartialDiscordIntegrationResponseSchema,
        PartialExternalConnectionIntegrationResponseSchema,
        PartialGuildSubscriptionIntegrationResponseSchema,
      ]),
    ),
    webhooks: z.array(
      z.xor([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    ),
    guild_scheduled_events: z.array(
      z.xor([
        ExternalScheduledEventResponseSchema,
        StageScheduledEventResponseSchema,
        VoiceScheduledEventResponseSchema,
      ]),
    ),
    threads: z.array(ThreadResponseSchema),
    application_commands: z.array(ApplicationCommandResponseSchema),
    auto_moderation_rules: z.array(
      z.xor([
        DefaultKeywordRuleResponseSchema,
        KeywordRuleResponseSchema,
        MLSpamRuleResponseSchema,
        MentionSpamRuleResponseSchema,
        SpamLinkRuleResponseSchema,
        z.null().nullable(),
      ]),
    ),
  })
  .openapi({
    required: [
      'audit_log_entries',
      'users',
      'integrations',
      'webhooks',
      'guild_scheduled_events',
      'threads',
      'application_commands',
      'auto_moderation_rules',
    ],
  })
  .openapi('GuildAuditLogResponse')

const GuildBanResponseSchema = z
  .object({ user: UserResponseSchema, reason: z.string().nullable().exactOptional() })
  .openapi({ required: ['user'] })
  .openapi('GuildBanResponse')

const GuildExplicitContentFilterTypesSchema = z
  .xor([
    z.literal(0).openapi({ title: 'DISABLED', description: 'media content will not be scanned' }),
    z
      .literal(1)
      .openapi({
        title: 'MEMBERS_WITHOUT_ROLES',
        description: 'media content sent by members without roles will be scanned',
      }),
    z
      .literal(2)
      .openapi({
        title: 'ALL_MEMBERS',
        description: 'media content sent by all members will be scanned',
      }),
  ])
  .openapi('GuildExplicitContentFilterTypes')

const GuildFeaturesSchema = z
  .xor([
    z
      .literal('ANIMATED_BANNER')
      .openapi({
        title: 'ANIMATED_BANNER',
        description: 'guild has access to set an animated guild banner image',
      }),
    z
      .literal('ANIMATED_ICON')
      .openapi({
        title: 'ANIMATED_ICON',
        description: 'guild has access to set an animated guild icon',
      }),
    z
      .literal('APPLICATION_COMMAND_PERMISSIONS_V2')
      .openapi({
        title: 'APPLICATION_COMMAND_PERMISSIONS_V2',
        description: 'guild is using the old permissions configuration behavior',
      }),
    z
      .literal('AUTO_MODERATION')
      .openapi({ title: 'AUTO_MODERATION', description: 'guild has set up auto moderation rules' }),
    z
      .literal('BANNER')
      .openapi({ title: 'BANNER', description: 'guild has access to set a guild banner image' }),
    z
      .literal('COMMUNITY')
      .openapi({
        title: 'COMMUNITY',
        description:
          'guild can enable welcome screen, Membership Screening, stage channels and discovery, and             receives community updates',
      }),
    z
      .literal('CREATOR_MONETIZABLE_PROVISIONAL')
      .openapi({
        title: 'CREATOR_MONETIZABLE_PROVISIONAL',
        description: 'guild has enabled monetization',
      }),
    z
      .literal('CREATOR_STORE_PAGE')
      .openapi({
        title: 'CREATOR_STORE_PAGE',
        description: 'guild has enabled the role subscription promo page',
      }),
    z
      .literal('DEVELOPER_SUPPORT_SERVER')
      .openapi({
        title: 'DEVELOPER_SUPPORT_SERVER',
        description: 'guild has been set as a support server on the App Directory',
      }),
    z
      .literal('DISCOVERABLE')
      .openapi({
        title: 'DISCOVERABLE',
        description: 'guild is able to be discovered in the directory',
      }),
    z
      .literal('FEATURABLE')
      .openapi({
        title: 'FEATURABLE',
        description: 'guild is able to be featured in the directory',
      }),
    z
      .literal('INVITES_DISABLED')
      .openapi({
        title: 'INVITES_DISABLED',
        description: 'guild has paused invites, preventing new users from joining',
      }),
    z
      .literal('INVITE_SPLASH')
      .openapi({
        title: 'INVITE_SPLASH',
        description: 'guild has access to set an invite splash background',
      }),
    z
      .literal('MEMBER_VERIFICATION_GATE_ENABLED')
      .openapi({
        title: 'MEMBER_VERIFICATION_GATE_ENABLED',
        description: 'guild has enabled Membership Screening',
      }),
    z
      .literal('MORE_STICKERS')
      .openapi({ title: 'MORE_STICKERS', description: 'guild has increased custom sticker slots' }),
    z
      .literal('NEWS')
      .openapi({ title: 'NEWS', description: 'guild has access to create announcement channels' }),
    z.literal('PARTNERED').openapi({ title: 'PARTNERED', description: 'guild is partnered' }),
    z
      .literal('PREVIEW_ENABLED')
      .openapi({
        title: 'PREVIEW_ENABLED',
        description:
          'guild can be previewed before joining via Membership Screening or the directory',
      }),
    z
      .literal('RAID_ALERTS_DISABLED')
      .openapi({
        title: 'RAID_ALERTS_DISABLED',
        description: 'guild has disabled activity alerts in the configured safety alerts channel',
      }),
    z
      .literal('ROLE_ICONS')
      .openapi({ title: 'ROLE_ICONS', description: 'guild is able to set role icons' }),
    z
      .literal('ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE')
      .openapi({
        title: 'ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE',
        description: 'guild has role subscriptions that can be purchased',
      }),
    z
      .literal('ROLE_SUBSCRIPTIONS_ENABLED')
      .openapi({
        title: 'ROLE_SUBSCRIPTIONS_ENABLED',
        description: 'guild has enabled role subscriptions',
      }),
    z
      .literal('TICKETED_EVENTS_ENABLED')
      .openapi({
        title: 'TICKETED_EVENTS_ENABLED',
        description: 'guild has enabled ticketed events',
      }),
    z
      .literal('VANITY_URL')
      .openapi({ title: 'VANITY_URL', description: 'guild has access to set a vanity URL' }),
    z.literal('VERIFIED').openapi({ title: 'VERIFIED', description: 'guild is verified' }),
    z
      .literal('VIP_REGIONS')
      .openapi({
        title: 'VIP_REGIONS',
        description:
          'guild has access to set 384kbps bitrate in voice (previously VIP voice servers)',
      }),
    z
      .literal('WELCOME_SCREEN_ENABLED')
      .openapi({
        title: 'WELCOME_SCREEN_ENABLED',
        description: 'guild has enabled the welcome screen',
      }),
  ])
  .openapi('GuildFeatures')

const WelcomeMessageResponseSchema = z
  .object({ author_ids: z.array(SnowflakeTypeSchema), message: z.string() })
  .openapi({ required: ['author_ids', 'message'] })
  .openapi('WelcomeMessageResponse')

const NewMemberActionTypeSchema = z
  .xor([z.literal(0).openapi({ title: 'VIEW' }), z.literal(1).openapi({ title: 'TALK' })])
  .openapi('NewMemberActionType')

const SettingsEmojiResponseSchema = z
  .object({
    id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    name: z.string().nullable().exactOptional(),
    animated: z.boolean(),
  })
  .openapi({ required: ['animated'] })
  .openapi('SettingsEmojiResponse')

const NewMemberActionResponseSchema = z
  .object({
    channel_id: SnowflakeTypeSchema,
    action_type: NewMemberActionTypeSchema,
    title: z.string(),
    description: z.string(),
    emoji: SettingsEmojiResponseSchema.exactOptional(),
    icon: z.string().exactOptional(),
  })
  .openapi({ required: ['channel_id', 'action_type', 'title', 'description'] })
  .openapi('NewMemberActionResponse')

const ResourceChannelResponseSchema = z
  .object({
    channel_id: SnowflakeTypeSchema,
    title: z.string(),
    emoji: SettingsEmojiResponseSchema.exactOptional(),
    icon: z.string().exactOptional(),
    description: z.string(),
  })
  .openapi({ required: ['channel_id', 'title', 'description'] })
  .openapi('ResourceChannelResponse')

const GuildHomeSettingsResponseSchema = z
  .object({
    guild_id: SnowflakeTypeSchema,
    enabled: z.boolean(),
    welcome_message: WelcomeMessageResponseSchema.exactOptional(),
    new_member_actions: z.array(z.xor([z.null().nullable(), NewMemberActionResponseSchema])),
    resource_channels: z.array(z.xor([z.null().nullable(), ResourceChannelResponseSchema])),
  })
  .openapi({ required: ['guild_id', 'enabled', 'new_member_actions', 'resource_channels'] })
  .openapi('GuildHomeSettingsResponse')

const VerificationLevelsSchema = z
  .xor([
    z.literal(0).openapi({ title: 'NONE', description: 'unrestricted' }),
    z.literal(1).openapi({ title: 'LOW', description: 'must have verified email on account' }),
    z
      .literal(2)
      .openapi({
        title: 'MEDIUM',
        description: 'must be registered on Discord for longer than 5 minutes',
      }),
    z
      .literal(3)
      .openapi({
        title: 'HIGH',
        description: 'must be a member of the server for longer than 10 minutes',
      }),
    z.literal(4).openapi({ title: 'VERY_HIGH', description: 'must have a verified phone number' }),
  ])
  .openapi('VerificationLevels')

const GuildNSFWContentLevelSchema = z
  .xor([
    z.literal(0).openapi({ title: 'DEFAULT' }),
    z.literal(1).openapi({ title: 'EXPLICIT' }),
    z.literal(2).openapi({ title: 'SAFE' }),
    z.literal(3).openapi({ title: 'AGE_RESTRICTED' }),
  ])
  .openapi('GuildNSFWContentLevel')

const InviteGuildResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    splash: z.string().nullable().exactOptional(),
    banner: z.string().nullable().exactOptional(),
    description: z.string().nullable().exactOptional(),
    icon: z.string().nullable().exactOptional(),
    features: z.array(GuildFeaturesSchema),
    verification_level: z.xor([z.null().nullable(), VerificationLevelsSchema]).exactOptional(),
    vanity_url_code: z.string().nullable().exactOptional(),
    nsfw_level: z.xor([z.null().nullable(), GuildNSFWContentLevelSchema]).exactOptional(),
    nsfw: z.boolean().nullable().exactOptional(),
    premium_subscription_count: z.int32(),
  })
  .openapi({ required: ['id', 'name', 'features', 'premium_subscription_count'] })
  .openapi('InviteGuildResponse')

const InviteApplicationResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    icon: z.string().nullable().exactOptional(),
    description: z.string(),
    type: z.xor([z.null().nullable(), ApplicationTypesSchema]).exactOptional(),
    cover_image: z.string().exactOptional(),
    primary_sku_id: SnowflakeTypeSchema.exactOptional(),
    bot: UserResponseSchema.exactOptional(),
    slug: z.string().exactOptional(),
    guild_id: SnowflakeTypeSchema.exactOptional(),
    rpc_origins: z.array(z.string().nullable()).exactOptional(),
    bot_public: z.boolean().exactOptional(),
    bot_require_code_grant: z.boolean().exactOptional(),
    terms_of_service_url: z.url().exactOptional(),
    privacy_policy_url: z.url().exactOptional(),
    custom_install_url: z.url().exactOptional(),
    install_params: ApplicationOAuth2InstallParamsResponseSchema.exactOptional(),
    integration_types_config: z
      .record(z.string(), ApplicationIntegrationTypeConfigurationResponseSchema)
      .exactOptional(),
    verify_key: z.string(),
    flags: z.int32(),
    max_participants: z.int32().nullable().exactOptional(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'description', 'verify_key', 'flags'] })
  .openapi('InviteApplicationResponse')

const ScheduledEventResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    name: z.string(),
    description: z.string().nullable().exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    creator_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    creator: UserResponseSchema.exactOptional(),
    image: z.string().nullable().exactOptional(),
    scheduled_start_time: z.iso.datetime(),
    scheduled_end_time: z.iso.datetime().nullable().exactOptional(),
    status: GuildScheduledEventStatusesSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    entity_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    recurrence_rule: z.xor([z.null().nullable(), RecurrenceRuleResponseSchema]).exactOptional(),
    user_count: z.int32().exactOptional(),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    user_rsvp: z.xor([z.null().nullable(), ScheduledEventUserResponseSchema]).exactOptional(),
  })
  .openapi({
    required: [
      'id',
      'guild_id',
      'name',
      'scheduled_start_time',
      'status',
      'entity_type',
      'privacy_level',
    ],
  })
  .openapi('ScheduledEventResponse')

const GuildInviteResponseSchema = z
  .object({
    type: InviteTypesSchema,
    code: z.string(),
    inviter: UserResponseSchema.exactOptional(),
    max_age: z.int32().exactOptional(),
    created_at: z.iso.datetime().exactOptional(),
    expires_at: z.iso.datetime().nullable().exactOptional(),
    is_contact: z.boolean().exactOptional(),
    flags: z.int32().exactOptional(),
    guild: InviteGuildResponseSchema,
    guild_id: SnowflakeTypeSchema,
    channel: InviteChannelResponseSchema,
    target_type: InviteTargetTypesSchema.exactOptional(),
    target_user: UserResponseSchema.exactOptional(),
    target_application: InviteApplicationResponseSchema.exactOptional(),
    guild_scheduled_event: ScheduledEventResponseSchema.exactOptional(),
    uses: z.int32().exactOptional(),
    max_uses: z.int32().exactOptional(),
    temporary: z.boolean().exactOptional(),
    approximate_member_count: z.int32().nullable().exactOptional(),
    approximate_presence_count: z.int32().nullable().exactOptional(),
    is_nickname_changeable: z.boolean().exactOptional(),
  })
  .openapi({ required: ['type', 'code', 'guild', 'guild_id', 'channel'] })
  .openapi('GuildInviteResponse')

const GuildMFALevelSchema = z
  .xor([
    z
      .literal(0)
      .openapi({
        title: 'NONE',
        description: 'Guild has no MFA/2FA requirement for moderation actions',
      }),
    z
      .literal(1)
      .openapi({
        title: 'ELEVATED',
        description: 'Guild has a 2FA requirement for moderation actions',
      }),
  ])
  .openapi('GuildMFALevel')

const GuildOnboardingModeSchema = z
  .xor([
    z
      .literal(0)
      .openapi({
        title: 'ONBOARDING_DEFAULT',
        description: 'Only Default Channels considered in constraints',
      }),
    z
      .literal(1)
      .openapi({
        title: 'ONBOARDING_ADVANCED',
        description: 'Default Channels and Onboarding Prompts considered in constraints',
      }),
  ])
  .openapi('GuildOnboardingMode')

const OnboardingPromptOptionResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    title: z.string(),
    description: z.string(),
    emoji: SettingsEmojiResponseSchema,
    role_ids: z.array(SnowflakeTypeSchema),
    channel_ids: z.array(SnowflakeTypeSchema),
  })
  .openapi({ required: ['id', 'title', 'description', 'emoji', 'role_ids', 'channel_ids'] })
  .openapi('OnboardingPromptOptionResponse')

const OnboardingPromptTypeSchema = z
  .xor([
    z.literal(0).openapi({ title: 'MULTIPLE_CHOICE', description: 'Multiple choice options' }),
    z.literal(1).openapi({ title: 'DROPDOWN', description: 'Many options shown as a dropdown' }),
  ])
  .openapi('OnboardingPromptType')

const OnboardingPromptResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    title: z.string(),
    options: z.array(OnboardingPromptOptionResponseSchema),
    single_select: z.boolean(),
    required: z.boolean(),
    in_onboarding: z.boolean(),
    type: OnboardingPromptTypeSchema,
  })
  .openapi({
    required: ['id', 'title', 'options', 'single_select', 'required', 'in_onboarding', 'type'],
  })
  .openapi('OnboardingPromptResponse')

const GuildOnboardingResponseSchema = z
  .object({
    guild_id: SnowflakeTypeSchema,
    prompts: z.array(OnboardingPromptResponseSchema),
    default_channel_ids: z.array(SnowflakeTypeSchema),
    enabled: z.boolean(),
  })
  .openapi({ required: ['guild_id', 'prompts', 'default_channel_ids', 'enabled'] })
  .openapi('GuildOnboardingResponse')

const UserNotificationSettingsSchema = z
  .xor([
    z
      .literal(0)
      .openapi({
        title: 'ALL_MESSAGES',
        description: 'members will receive notifications for all messages by default',
      }),
    z
      .literal(1)
      .openapi({
        title: 'ONLY_MENTIONS',
        description:
          'members will receive notifications only for messages that @mention them by default',
      }),
  ])
  .openapi('UserNotificationSettings')

const GuildPatchRequestPartialSchema = z
  .object({
    name: z.string().min(2).max(100).exactOptional(),
    description: z.string().min(0).max(300).nullable().exactOptional(),
    region: z.string().nullable().exactOptional(),
    icon: z.string().nullable().exactOptional(),
    verification_level: z.xor([z.null().nullable(), VerificationLevelsSchema]).exactOptional(),
    default_message_notifications: z
      .xor([z.null().nullable(), UserNotificationSettingsSchema])
      .exactOptional(),
    explicit_content_filter: z
      .xor([z.null().nullable(), GuildExplicitContentFilterTypesSchema])
      .exactOptional(),
    preferred_locale: z.xor([z.null().nullable(), AvailableLocalesEnumSchema]).exactOptional(),
    afk_timeout: z.xor([z.null().nullable(), AfkTimeoutsSchema]).exactOptional(),
    afk_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    system_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    splash: z.string().nullable().exactOptional(),
    banner: z.string().nullable().exactOptional(),
    system_channel_flags: z.int().nullable().exactOptional(),
    features: z.array(z.string().max(152133).nullable()).max(1521).nullable().exactOptional(),
    discovery_splash: z.string().nullable().exactOptional(),
    home_header: z.string().nullable().exactOptional(),
    rules_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    safety_alerts_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    public_updates_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    premium_progress_bar_enabled: z.boolean().nullable().exactOptional(),
  })
  .openapi('GuildPatchRequestPartial')

const GuildPreviewResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    icon: z.string().nullable().exactOptional(),
    description: z.string().nullable().exactOptional(),
    home_header: z.string().nullable().exactOptional(),
    splash: z.string().nullable().exactOptional(),
    discovery_splash: z.string().nullable().exactOptional(),
    features: z.array(GuildFeaturesSchema),
    approximate_member_count: z.int32(),
    approximate_presence_count: z.int32(),
    emojis: z.array(EmojiResponseSchema),
    stickers: z.array(GuildStickerResponseSchema),
  })
  .openapi({
    required: [
      'id',
      'name',
      'features',
      'approximate_member_count',
      'approximate_presence_count',
      'emojis',
      'stickers',
    ],
  })
  .openapi('GuildPreviewResponse')

const GuildPruneResponseSchema = z
  .object({ pruned: z.int32().nullable().exactOptional() })
  .openapi('GuildPruneResponse')

const PremiumGuildTiersSchema = z
  .xor([
    z
      .literal(0)
      .openapi({ title: 'NONE', description: 'Guild has not unlocked any Server Boost perks' }),
    z
      .literal(1)
      .openapi({ title: 'TIER_1', description: 'Guild has unlocked Server Boost level 1 perks' }),
    z
      .literal(2)
      .openapi({ title: 'TIER_2', description: 'Guild has unlocked Server Boost level 2 perks' }),
    z
      .literal(3)
      .openapi({ title: 'TIER_3', description: 'Guild has unlocked Server Boost level 3 perks' }),
  ])
  .openapi('PremiumGuildTiers')

const GuildResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    icon: z.string().nullable().exactOptional(),
    description: z.string().nullable().exactOptional(),
    home_header: z.string().nullable().exactOptional(),
    splash: z.string().nullable().exactOptional(),
    discovery_splash: z.string().nullable().exactOptional(),
    features: z.array(GuildFeaturesSchema),
    banner: z.string().nullable().exactOptional(),
    owner_id: SnowflakeTypeSchema,
    application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    region: z.string(),
    afk_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    afk_timeout: AfkTimeoutsSchema,
    system_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    system_channel_flags: z.int32(),
    widget_enabled: z.boolean(),
    widget_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    verification_level: VerificationLevelsSchema,
    roles: z.array(GuildRoleResponseSchema),
    default_message_notifications: UserNotificationSettingsSchema,
    mfa_level: GuildMFALevelSchema,
    explicit_content_filter: GuildExplicitContentFilterTypesSchema,
    max_presences: z.int32().nullable().exactOptional(),
    max_members: z.int32(),
    max_stage_video_channel_users: z.int32(),
    max_video_channel_users: z.int32(),
    vanity_url_code: z.string().nullable().exactOptional(),
    premium_tier: PremiumGuildTiersSchema,
    premium_subscription_count: z.int32(),
    preferred_locale: AvailableLocalesEnumSchema,
    rules_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    safety_alerts_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    public_updates_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    premium_progress_bar_enabled: z.boolean(),
    nsfw: z.boolean(),
    nsfw_level: GuildNSFWContentLevelSchema,
    emojis: z.array(EmojiResponseSchema),
    stickers: z.array(GuildStickerResponseSchema),
  })
  .openapi({
    required: [
      'id',
      'name',
      'features',
      'owner_id',
      'region',
      'afk_timeout',
      'system_channel_flags',
      'widget_enabled',
      'verification_level',
      'roles',
      'default_message_notifications',
      'mfa_level',
      'explicit_content_filter',
      'max_members',
      'max_stage_video_channel_users',
      'max_video_channel_users',
      'premium_tier',
      'premium_subscription_count',
      'preferred_locale',
      'premium_progress_bar_enabled',
      'nsfw',
      'nsfw_level',
      'emojis',
      'stickers',
    ],
  })
  .openapi('GuildResponse')

const SearchMessageResponseSchema = z
  .object({
    type: MessageTypeSchema,
    content: z.string(),
    mentions: z.array(UserResponseSchema),
    mention_roles: z.array(SnowflakeTypeSchema),
    attachments: z.array(MessageAttachmentResponseSchema),
    embeds: z.array(MessageEmbedResponseSchema),
    timestamp: z.iso.datetime(),
    edited_timestamp: z.iso.datetime().nullable().exactOptional(),
    flags: z.int32(),
    components: z.array(
      z.xor([
        ActionRowComponentResponseSchema,
        ContainerComponentResponseSchema,
        FileComponentResponseSchema,
        MediaGalleryComponentResponseSchema,
        SectionComponentResponseSchema,
        SeparatorComponentResponseSchema,
        TextDisplayComponentResponseSchema,
      ]),
    ),
    stickers: z
      .array(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]))
      .exactOptional(),
    sticker_items: z.array(MessageStickerItemResponseSchema).exactOptional(),
    id: SnowflakeTypeSchema,
    channel_id: SnowflakeTypeSchema,
    author: UserResponseSchema,
    pinned: z.boolean(),
    mention_everyone: z.boolean(),
    tts: z.boolean(),
    call: MessageCallResponseSchema.exactOptional(),
    activity: MessageActivityResponseSchema.exactOptional(),
    application: BasicApplicationResponseSchema.exactOptional(),
    application_id: SnowflakeTypeSchema.exactOptional(),
    interaction: MessageInteractionResponseSchema.exactOptional(),
    nonce: z
      .xor([
        z.int64().min(-9223372036854776000n).max(9223372036854776000n),
        z.string().max(25),
        z.null().nullable(),
      ])
      .exactOptional(),
    webhook_id: SnowflakeTypeSchema.exactOptional(),
    message_reference: MessageReferenceResponseSchema.exactOptional(),
    thread: ThreadResponseSchema.exactOptional(),
    mention_channels: z
      .array(z.xor([z.null().nullable(), MessageMentionChannelResponseSchema]))
      .exactOptional(),
    role_subscription_data: MessageRoleSubscriptionDataResponseSchema.exactOptional(),
    purchase_notification: PurchaseNotificationResponseSchema.exactOptional(),
    position: z.int32().exactOptional(),
    resolved: ResolvedObjectsResponseSchema.exactOptional(),
    poll: PollResponseSchema.exactOptional(),
    shared_client_theme: z
      .xor([z.null().nullable(), CustomClientThemeResponseSchema])
      .exactOptional(),
    interaction_metadata: z
      .xor([
        ApplicationCommandInteractionMetadataResponseSchema,
        MessageComponentInteractionMetadataResponseSchema,
        ModalSubmitInteractionMetadataResponseSchema,
      ])
      .exactOptional(),
    message_snapshots: z.array(MessageSnapshotResponseSchema).exactOptional(),
    reactions: z.array(MessageReactionResponseSchema).exactOptional(),
    referenced_message: z.xor([z.null().nullable(), BasicMessageResponseSchema]).exactOptional(),
    hit: z.boolean(),
  })
  .openapi({
    required: [
      'type',
      'content',
      'mentions',
      'mention_roles',
      'attachments',
      'embeds',
      'timestamp',
      'flags',
      'components',
      'id',
      'channel_id',
      'author',
      'pinned',
      'mention_everyone',
      'tts',
      'hit',
    ],
  })
  .openapi('SearchMessageResponse')

const GuildSearchResponseSchema = z
  .object({
    analytics_id: z.string(),
    messages: z.array(z.array(SearchMessageResponseSchema)),
    doing_deep_historical_index: z.boolean(),
    total_results: z.int32(),
    threads: z.array(ThreadResponseSchema).nullable().exactOptional(),
    members: z.array(ThreadMemberResponseSchema).nullable().exactOptional(),
    documents_indexed: z.int32().nullable().exactOptional(),
  })
  .openapi({
    required: ['analytics_id', 'messages', 'doing_deep_historical_index', 'total_results'],
  })
  .openapi('GuildSearchResponse')

const GuildSubscriptionIntegrationResponseSchema = z
  .object({
    type: IntegrationTypesSchema,
    name: z.string().nullable().exactOptional(),
    account: AccountResponseSchema,
    enabled: z.boolean(),
    id: SnowflakeTypeSchema,
  })
  .openapi({ required: ['type', 'account', 'enabled', 'id'] })
  .openapi('GuildSubscriptionIntegrationResponse')

const GuildTemplateChannelTagsSchema = z
  .object({
    id: z.int32().nullable().exactOptional(),
    name: z.string(),
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().nullable().exactOptional(),
    moderated: z.boolean().nullable().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('GuildTemplateChannelTags')

const IconEmojiResponseSchema = z.object({}).openapi('IconEmojiResponse')

const GuildTemplateChannelResponseSchema = z
  .object({
    id: z.int32().nullable().exactOptional(),
    type: ChannelTypesSchema,
    name: z.string().nullable().exactOptional(),
    position: z.int32().nullable().exactOptional(),
    topic: z.string().nullable().exactOptional(),
    bitrate: z.int32(),
    user_limit: z.int32(),
    nsfw: z.boolean(),
    rate_limit_per_user: z.int32(),
    parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    default_auto_archive_duration: z
      .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
      .exactOptional(),
    permission_overwrites: z.array(
      z.xor([z.null().nullable(), ChannelPermissionOverwriteResponseSchema]),
    ),
    available_tags: z.array(GuildTemplateChannelTagsSchema).nullable().exactOptional(),
    template: z.string(),
    default_reaction_emoji: z
      .xor([z.null().nullable(), DefaultReactionEmojiResponseSchema])
      .exactOptional(),
    default_thread_rate_limit_per_user: z.int32().nullable().exactOptional(),
    default_sort_order: z.xor([z.null().nullable(), ThreadSortOrderSchema]).exactOptional(),
    default_forum_layout: z.xor([z.null().nullable(), ForumLayoutSchema]).exactOptional(),
    default_tag_setting: z.xor([z.null().nullable(), ThreadSearchTagSettingSchema]).exactOptional(),
    icon_emoji: z.xor([z.null().nullable(), IconEmojiResponseSchema]).exactOptional(),
    theme_color: z.int32().nullable().exactOptional(),
  })
  .openapi({
    required: [
      'type',
      'bitrate',
      'user_limit',
      'nsfw',
      'rate_limit_per_user',
      'permission_overwrites',
      'template',
    ],
  })
  .openapi('GuildTemplateChannelResponse')

const GuildTemplateRoleColorsResponseSchema = z
  .object({
    primary_color: z.int32(),
    secondary_color: z.int32().nullable().exactOptional(),
    tertiary_color: z.int32().nullable().exactOptional(),
  })
  .openapi({ required: ['primary_color'] })
  .openapi('GuildTemplateRoleColorsResponse')

const GuildTemplateRoleResponseSchema = z
  .object({
    id: z.int32(),
    name: z.string(),
    permissions: z.string(),
    color: z.int32(),
    colors: z.xor([z.null().nullable(), GuildTemplateRoleColorsResponseSchema]).exactOptional(),
    hoist: z.boolean(),
    mentionable: z.boolean(),
    icon: z.string().nullable().exactOptional(),
    unicode_emoji: z.string().nullable().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'permissions', 'color', 'hoist', 'mentionable'] })
  .openapi('GuildTemplateRoleResponse')

const GuildTemplateSnapshotResponseSchema = z
  .object({
    name: z.string(),
    description: z.string().nullable().exactOptional(),
    region: z.string().nullable().exactOptional(),
    verification_level: VerificationLevelsSchema,
    default_message_notifications: UserNotificationSettingsSchema,
    explicit_content_filter: GuildExplicitContentFilterTypesSchema,
    preferred_locale: AvailableLocalesEnumSchema,
    afk_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    afk_timeout: AfkTimeoutsSchema,
    system_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    system_channel_flags: z.int32(),
    roles: z.array(GuildTemplateRoleResponseSchema),
    channels: z.array(GuildTemplateChannelResponseSchema),
  })
  .openapi({
    required: [
      'name',
      'verification_level',
      'default_message_notifications',
      'explicit_content_filter',
      'preferred_locale',
      'afk_timeout',
      'system_channel_flags',
      'roles',
      'channels',
    ],
  })
  .openapi('GuildTemplateSnapshotResponse')

const GuildTemplateResponseSchema = z
  .object({
    code: z.string(),
    name: z.string(),
    description: z.string().nullable().exactOptional(),
    usage_count: z.int32(),
    creator_id: SnowflakeTypeSchema,
    creator: z.xor([z.null().nullable(), UserResponseSchema]).exactOptional(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
    source_guild_id: SnowflakeTypeSchema,
    serialized_source_guild: GuildTemplateSnapshotResponseSchema,
    is_dirty: z.boolean().nullable().exactOptional(),
  })
  .openapi({
    required: [
      'code',
      'name',
      'usage_count',
      'creator_id',
      'created_at',
      'updated_at',
      'source_guild_id',
      'serialized_source_guild',
    ],
  })
  .openapi('GuildTemplateResponse')

const GuildWelcomeChannelSchema = z
  .object({
    channel_id: SnowflakeTypeSchema,
    description: z.string().min(1).max(50),
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().max(152133).nullable().exactOptional(),
  })
  .openapi({ required: ['channel_id', 'description'] })
  .openapi('GuildWelcomeChannel')

const GuildWelcomeScreenChannelResponseSchema = z
  .object({
    channel_id: SnowflakeTypeSchema,
    description: z.string(),
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().nullable().exactOptional(),
  })
  .openapi({ required: ['channel_id', 'description'] })
  .openapi('GuildWelcomeScreenChannelResponse')

const GuildWelcomeScreenResponseSchema = z
  .object({
    description: z.string().nullable().exactOptional(),
    welcome_channels: z.array(GuildWelcomeScreenChannelResponseSchema),
  })
  .openapi({ required: ['welcome_channels'] })
  .openapi('GuildWelcomeScreenResponse')

const GuildWithCountsResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    icon: z.string().nullable().exactOptional(),
    description: z.string().nullable().exactOptional(),
    home_header: z.string().nullable().exactOptional(),
    splash: z.string().nullable().exactOptional(),
    discovery_splash: z.string().nullable().exactOptional(),
    features: z.array(GuildFeaturesSchema),
    banner: z.string().nullable().exactOptional(),
    owner_id: SnowflakeTypeSchema,
    application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    region: z.string(),
    afk_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    afk_timeout: AfkTimeoutsSchema,
    system_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    system_channel_flags: z.int32(),
    widget_enabled: z.boolean(),
    widget_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    verification_level: VerificationLevelsSchema,
    roles: z.array(GuildRoleResponseSchema),
    default_message_notifications: UserNotificationSettingsSchema,
    mfa_level: GuildMFALevelSchema,
    explicit_content_filter: GuildExplicitContentFilterTypesSchema,
    max_presences: z.int32().nullable().exactOptional(),
    max_members: z.int32(),
    max_stage_video_channel_users: z.int32(),
    max_video_channel_users: z.int32(),
    vanity_url_code: z.string().nullable().exactOptional(),
    premium_tier: PremiumGuildTiersSchema,
    premium_subscription_count: z.int32(),
    preferred_locale: AvailableLocalesEnumSchema,
    rules_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    safety_alerts_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    public_updates_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    premium_progress_bar_enabled: z.boolean(),
    nsfw: z.boolean(),
    nsfw_level: GuildNSFWContentLevelSchema,
    emojis: z.array(EmojiResponseSchema),
    stickers: z.array(GuildStickerResponseSchema),
    approximate_member_count: z.int32().nullable().exactOptional(),
    approximate_presence_count: z.int32().nullable().exactOptional(),
  })
  .openapi({
    required: [
      'id',
      'name',
      'features',
      'owner_id',
      'region',
      'afk_timeout',
      'system_channel_flags',
      'widget_enabled',
      'verification_level',
      'roles',
      'default_message_notifications',
      'mfa_level',
      'explicit_content_filter',
      'max_members',
      'max_stage_video_channel_users',
      'max_video_channel_users',
      'premium_tier',
      'premium_subscription_count',
      'preferred_locale',
      'premium_progress_bar_enabled',
      'nsfw',
      'nsfw_level',
      'emojis',
      'stickers',
    ],
  })
  .openapi('GuildWithCountsResponse')

const HasOptionSchema = z
  .xor([
    z.literal('link').openapi({ title: 'LINK' }),
    z.literal('embed').openapi({ title: 'EMBED' }),
    z.literal('file').openapi({ title: 'FILE' }),
    z.literal('image').openapi({ title: 'IMAGE' }),
    z.literal('video').openapi({ title: 'VIDEO' }),
    z.literal('sound').openapi({ title: 'SOUND' }),
    z.literal('sticker').openapi({ title: 'STICKER' }),
    z.literal('poll').openapi({ title: 'POLL' }),
    z.literal('snapshot').openapi({ title: 'SNAPSHOT' }),
    z.literal('-link').openapi({ title: 'NO_LINK' }),
    z.literal('-embed').openapi({ title: 'NO_EMBED' }),
    z.literal('-file').openapi({ title: 'NO_FILE' }),
    z.literal('-image').openapi({ title: 'NO_IMAGE' }),
    z.literal('-video').openapi({ title: 'NO_VIDEO' }),
    z.literal('-sound').openapi({ title: 'NO_SOUND' }),
    z.literal('-sticker').openapi({ title: 'NO_STICKER' }),
    z.literal('-poll').openapi({ title: 'NO_POLL' }),
    z.literal('-snapshot').openapi({ title: 'NO_SNAPSHOT' }),
  ])
  .openapi('HasOption')

const IncomingWebhookRequestPartialSchema = z
  .object({
    content: z.string().max(2000).nullable().exactOptional(),
    embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
    allowed_mentions: z
      .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
      .exactOptional(),
    components: z
      .array(
        z.xor([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      )
      .max(40)
      .nullable()
      .exactOptional(),
    attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
    poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
    tts: z.boolean().nullable().exactOptional(),
    flags: z.int().nullable().exactOptional(),
    username: z.string().min(1).max(80).nullable().exactOptional(),
    avatar_url: z.url().max(2048).nullable().exactOptional(),
    thread_name: z.string().min(0).max(100).nullable().exactOptional(),
    applied_tags: z.array(SnowflakeTypeSchema).max(5).nullable().exactOptional(),
  })
  .openapi('IncomingWebhookRequestPartial')

const IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema = z
  .object({
    content: z.string().max(2000).nullable().exactOptional(),
    embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
    allowed_mentions: z
      .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
      .exactOptional(),
    components: z
      .array(
        z.xor([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      )
      .max(40)
      .nullable()
      .exactOptional(),
    attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
    flags: z.int().nullable().exactOptional(),
  })
  .openapi('IncomingWebhookUpdateForInteractionCallbackRequestPartial')

const IncomingWebhookUpdateRequestPartialSchema = z
  .object({
    content: z.string().max(2000).nullable().exactOptional(),
    embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
    allowed_mentions: z
      .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
      .exactOptional(),
    components: z
      .array(
        z.xor([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      )
      .max(40)
      .nullable()
      .exactOptional(),
    attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
    poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
    flags: z.int().nullable().exactOptional(),
  })
  .openapi('IncomingWebhookUpdateRequestPartial')

const InteractionCallbackResponseSchema: z.ZodType<InteractionCallbackResponseType> = z
  .lazy(() =>
    z
      .object({
        interaction: InteractionResponseSchema,
        resource: z
          .xor([
            CreateMessageInteractionCallbackResponseSchema,
            LaunchActivityInteractionCallbackResponseSchema,
            UpdateMessageInteractionCallbackResponseSchema,
          ])
          .exactOptional(),
      })
      .openapi({ required: ['interaction'] }),
  )
  .openapi('InteractionCallbackResponse')

const KeywordTriggerMetadataSchema = z
  .object({
    keyword_filter: z.array(z.string().min(1).max(60)).max(1000).nullable().exactOptional(),
    regex_patterns: z.array(z.string().min(1).max(260)).max(10).nullable().exactOptional(),
    allow_list: z.array(z.string().min(1).max(60)).max(100).nullable().exactOptional(),
  })
  .openapi('KeywordTriggerMetadata')

const KeywordUpsertRequestSchema = z
  .object({
    name: z.string().max(100),
    event_type: AutomodEventTypeSchema,
    actions: z
      .array(
        z.xor([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      )
      .min(1)
      .max(5)
      .nullable()
      .exactOptional(),
    enabled: z.boolean().nullable().exactOptional(),
    exempt_roles: z.array(SnowflakeTypeSchema).max(20).nullable().exactOptional(),
    exempt_channels: z.array(SnowflakeTypeSchema).max(50).nullable().exactOptional(),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: z.xor([z.null().nullable(), KeywordTriggerMetadataSchema]).exactOptional(),
  })
  .openapi({ required: ['name', 'event_type', 'trigger_type'] })
  .openapi('KeywordUpsertRequest')

const KeywordUpsertRequestPartialSchema = z
  .object({
    name: z.string().max(100).exactOptional(),
    event_type: AutomodEventTypeSchema.exactOptional(),
    actions: z
      .array(
        z.xor([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      )
      .min(1)
      .max(5)
      .nullable()
      .exactOptional(),
    enabled: z.boolean().nullable().exactOptional(),
    exempt_roles: z.array(SnowflakeTypeSchema).max(20).nullable().exactOptional(),
    exempt_channels: z.array(SnowflakeTypeSchema).max(50).nullable().exactOptional(),
    trigger_type: AutomodTriggerTypeSchema.exactOptional(),
    trigger_metadata: z.xor([z.null().nullable(), KeywordTriggerMetadataSchema]).exactOptional(),
  })
  .openapi('KeywordUpsertRequestPartial')

const MentionableSelectComponentForModalRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    placeholder: z.string().max(150).nullable().exactOptional(),
    min_values: z.int().min(0).max(25).nullable().exactOptional(),
    max_values: z.int().min(1).max(25).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    default_values: z
      .array(z.xor([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema]))
      .max(25)
      .nullable()
      .exactOptional(),
  })
  .openapi({ required: ['type', 'custom_id'] })
  .openapi('MentionableSelectComponentForModalRequest')

const RoleSelectComponentForModalRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    placeholder: z.string().max(150).nullable().exactOptional(),
    min_values: z.int().min(0).max(25).nullable().exactOptional(),
    max_values: z.int().min(1).max(25).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    default_values: z.array(RoleSelectDefaultValueSchema).max(25).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'custom_id'] })
  .openapi('RoleSelectComponentForModalRequest')

const StringSelectComponentForModalRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    placeholder: z.string().max(150).nullable().exactOptional(),
    min_values: z.int().min(0).max(25).nullable().exactOptional(),
    max_values: z.int().min(1).max(25).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    options: z.array(StringSelectOptionForRequestSchema).min(1).max(25),
  })
  .openapi({ required: ['type', 'custom_id', 'options'] })
  .openapi('StringSelectComponentForModalRequest')

const UserSelectComponentForModalRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    custom_id: z.string().min(1).max(100),
    placeholder: z.string().max(150).nullable().exactOptional(),
    min_values: z.int().min(0).max(25).nullable().exactOptional(),
    max_values: z.int().min(1).max(25).nullable().exactOptional(),
    disabled: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    default_values: z.array(UserSelectDefaultValueSchema).max(25).nullable().exactOptional(),
  })
  .openapi({ required: ['type', 'custom_id'] })
  .openapi('UserSelectComponentForModalRequest')

const LabelComponentForModalRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    label: z.string().min(1).max(45),
    description: z.string().min(1).max(100).nullable().exactOptional(),
    component: z.xor([
      ChannelSelectComponentForModalRequestSchema,
      FileUploadComponentForModalRequestSchema,
      MentionableSelectComponentForModalRequestSchema,
      RoleSelectComponentForModalRequestSchema,
      StringSelectComponentForModalRequestSchema,
      TextInputComponentForModalRequestSchema,
      UserSelectComponentForModalRequestSchema,
    ]),
  })
  .openapi({ required: ['type', 'label', 'component'] })
  .openapi('LabelComponentForModalRequest')

const LaunchActivityInteractionCallbackRequestSchema = z
  .object({ type: InteractionCallbackTypesSchema })
  .openapi({ required: ['type'] })
  .openapi('LaunchActivityInteractionCallbackRequest')

const ListApplicationEmojisResponseSchema = z
  .object({ items: z.array(EmojiResponseSchema) })
  .openapi({ required: ['items'] })
  .openapi('ListApplicationEmojisResponse')

const SoundboardSoundResponseSchema = z
  .object({
    name: z.string(),
    sound_id: SnowflakeTypeSchema,
    volume: z.number(),
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().nullable().exactOptional(),
    guild_id: SnowflakeTypeSchema.exactOptional(),
    available: z.boolean(),
    user: UserResponseSchema.exactOptional(),
  })
  .openapi({ required: ['name', 'sound_id', 'volume', 'available'] })
  .openapi('SoundboardSoundResponse')

const ListGuildSoundboardSoundsResponseSchema = z
  .object({ items: z.array(SoundboardSoundResponseSchema) })
  .openapi({ required: ['items'] })
  .openapi('ListGuildSoundboardSoundsResponse')

const LobbyGuildInviteResponseSchema = z
  .object({ code: z.string() })
  .openapi({ required: ['code'] })
  .openapi('LobbyGuildInviteResponse')

const LobbyMemberRequestSchema = z
  .object({
    id: SnowflakeTypeSchema,
    metadata: z
      .record(z.string(), z.string().max(1024))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 25 }),
    flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
  })
  .openapi({ required: ['id'] })
  .openapi('LobbyMemberRequest')

const LobbyMemberResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    metadata: z.record(z.string(), z.string()).nullable().exactOptional(),
    flags: z.int32(),
  })
  .openapi({ required: ['id', 'flags'] })
  .openapi('LobbyMemberResponse')

const LobbyMessageResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    type: MessageTypeSchema,
    content: z.string(),
    lobby_id: SnowflakeTypeSchema,
    channel_id: SnowflakeTypeSchema,
    author: UserResponseSchema,
    metadata: z.record(z.string(), z.string()).exactOptional(),
    flags: z.int32(),
    application_id: SnowflakeTypeSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'content', 'lobby_id', 'channel_id', 'author', 'flags'] })
  .openapi('LobbyMessageResponse')

const LobbyResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    application_id: SnowflakeTypeSchema,
    metadata: z.record(z.string(), z.string()).nullable().exactOptional(),
    members: z.array(LobbyMemberResponseSchema),
    linked_channel: GuildChannelResponseSchema.exactOptional(),
    flags: UInt32TypeSchema,
    override_event_webhooks_url: z.string().nullable().exactOptional(),
  })
  .openapi({ required: ['id', 'application_id', 'members', 'flags'] })
  .openapi('LobbyResponse')

const MLSpamTriggerMetadataSchema = z.object({}).openapi('MLSpamTriggerMetadata')

const MLSpamUpsertRequestSchema = z
  .object({
    name: z.string().max(100),
    event_type: AutomodEventTypeSchema,
    actions: z
      .array(
        z.xor([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      )
      .min(1)
      .max(5)
      .nullable()
      .exactOptional(),
    enabled: z.boolean().nullable().exactOptional(),
    exempt_roles: z.array(SnowflakeTypeSchema).max(20).nullable().exactOptional(),
    exempt_channels: z.array(SnowflakeTypeSchema).max(50).nullable().exactOptional(),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: z.xor([z.null().nullable(), MLSpamTriggerMetadataSchema]).exactOptional(),
  })
  .openapi({ required: ['name', 'event_type', 'trigger_type'] })
  .openapi('MLSpamUpsertRequest')

const MLSpamUpsertRequestPartialSchema = z
  .object({
    name: z.string().max(100).exactOptional(),
    event_type: AutomodEventTypeSchema.exactOptional(),
    actions: z
      .array(
        z.xor([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      )
      .min(1)
      .max(5)
      .nullable()
      .exactOptional(),
    enabled: z.boolean().nullable().exactOptional(),
    exempt_roles: z.array(SnowflakeTypeSchema).max(20).nullable().exactOptional(),
    exempt_channels: z.array(SnowflakeTypeSchema).max(50).nullable().exactOptional(),
    trigger_type: AutomodTriggerTypeSchema.exactOptional(),
    trigger_metadata: z.xor([z.null().nullable(), MLSpamTriggerMetadataSchema]).exactOptional(),
  })
  .openapi('MLSpamUpsertRequestPartial')

const MentionSpamTriggerMetadataSchema = z
  .object({
    mention_total_limit: z.int().min(0).max(50).nullable().exactOptional(),
    mention_raid_protection_enabled: z.boolean().nullable().exactOptional(),
  })
  .openapi('MentionSpamTriggerMetadata')

const MentionSpamUpsertRequestSchema = z
  .object({
    name: z.string().max(100),
    event_type: AutomodEventTypeSchema,
    actions: z
      .array(
        z.xor([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      )
      .min(1)
      .max(5)
      .nullable()
      .exactOptional(),
    enabled: z.boolean().nullable().exactOptional(),
    exempt_roles: z.array(SnowflakeTypeSchema).max(20).nullable().exactOptional(),
    exempt_channels: z.array(SnowflakeTypeSchema).max(50).nullable().exactOptional(),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: z
      .xor([z.null().nullable(), MentionSpamTriggerMetadataSchema])
      .exactOptional(),
  })
  .openapi({ required: ['name', 'event_type', 'trigger_type'] })
  .openapi('MentionSpamUpsertRequest')

const MentionSpamUpsertRequestPartialSchema = z
  .object({
    name: z.string().max(100).exactOptional(),
    event_type: AutomodEventTypeSchema.exactOptional(),
    actions: z
      .array(
        z.xor([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      )
      .min(1)
      .max(5)
      .nullable()
      .exactOptional(),
    enabled: z.boolean().nullable().exactOptional(),
    exempt_roles: z.array(SnowflakeTypeSchema).max(20).nullable().exactOptional(),
    exempt_channels: z.array(SnowflakeTypeSchema).max(50).nullable().exactOptional(),
    trigger_type: AutomodTriggerTypeSchema.exactOptional(),
    trigger_metadata: z
      .xor([z.null().nullable(), MentionSpamTriggerMetadataSchema])
      .exactOptional(),
  })
  .openapi('MentionSpamUpsertRequestPartial')

const MessageReferenceRequestSchema = z
  .object({
    guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    message_id: SnowflakeTypeSchema,
    fail_if_not_exists: z.boolean().nullable().exactOptional(),
    type: z.xor([z.null().nullable(), MessageReferenceTypeSchema]).exactOptional(),
  })
  .openapi({ required: ['message_id'] })
  .openapi('MessageReferenceRequest')

const MessageCreateRequestSchema = z
  .object({
    content: z.string().max(4000).nullable().exactOptional(),
    embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
    allowed_mentions: z
      .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
      .exactOptional(),
    sticker_ids: z.array(SnowflakeTypeSchema).max(3).nullable().exactOptional(),
    components: z
      .array(
        z.xor([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      )
      .max(40)
      .nullable()
      .exactOptional(),
    flags: z.int().nullable().exactOptional(),
    attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
    poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
    shared_client_theme: z
      .xor([z.null().nullable(), CustomClientThemeShareRequestSchema])
      .exactOptional(),
    confetti_potion: z
      .xor([z.null().nullable(), ConfettiPotionCreateRequestSchema])
      .exactOptional(),
    message_reference: z.xor([z.null().nullable(), MessageReferenceRequestSchema]).exactOptional(),
    nonce: z
      .xor([
        z.int64().min(-9223372036854776000n).max(9223372036854776000n),
        z.string().max(25),
        z.null().nullable(),
      ])
      .exactOptional(),
    enforce_nonce: z.boolean().nullable().exactOptional(),
    tts: z.boolean().nullable().exactOptional(),
  })
  .openapi('MessageCreateRequest')

const MessageEditRequestPartialSchema = z
  .object({
    content: z.string().max(4000).nullable().exactOptional(),
    embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
    flags: z.int().nullable().exactOptional(),
    allowed_mentions: z
      .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
      .exactOptional(),
    sticker_ids: z.array(SnowflakeTypeSchema).max(1521).nullable().exactOptional(),
    components: z
      .array(
        z.xor([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      )
      .max(40)
      .nullable()
      .exactOptional(),
    attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
  })
  .openapi('MessageEditRequestPartial')

const TextDisplayComponentForModalRequestSchema = z
  .object({
    type: MessageComponentTypesSchema,
    id: z.int32().min(0).nullable().exactOptional(),
    content: z.string().min(1).max(4000),
  })
  .openapi({ required: ['type', 'content'] })
  .openapi('TextDisplayComponentForModalRequest')

const ModalInteractionCallbackRequestDataSchema = z
  .object({
    custom_id: z.string().min(1).max(100),
    title: z.string().min(1).max(45),
    components: z
      .array(
        z.xor([
          ActionRowComponentForModalRequestSchema,
          LabelComponentForModalRequestSchema,
          TextDisplayComponentForModalRequestSchema,
        ]),
      )
      .min(1)
      .max(40),
  })
  .openapi({ required: ['custom_id', 'title', 'components'] })
  .openapi('ModalInteractionCallbackRequestData')

const ModalInteractionCallbackRequestSchema = z
  .object({ type: InteractionCallbackTypesSchema, data: ModalInteractionCallbackRequestDataSchema })
  .openapi({ required: ['type', 'data'] })
  .openapi('ModalInteractionCallbackRequest')

const MyGuildResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    icon: z.string().nullable().exactOptional(),
    banner: z.string().nullable().exactOptional(),
    owner: z.boolean(),
    permissions: z.string(),
    features: z.array(GuildFeaturesSchema),
    approximate_member_count: z.int32().nullable().exactOptional(),
    approximate_presence_count: z.int32().nullable().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'owner', 'permissions', 'features'] })
  .openapi('MyGuildResponse')

const OAuth2GetAuthorizationResponseSchema = z
  .object({
    application: ApplicationResponseSchema,
    expires: z.iso.datetime(),
    scopes: z.array(OAuth2ScopesSchema),
    user: UserResponseSchema.exactOptional(),
  })
  .openapi({ required: ['application', 'expires', 'scopes'] })
  .openapi('OAuth2GetAuthorizationResponse')

const OAuth2KeySchema = z
  .object({
    kty: z.string(),
    use: z.string(),
    kid: z.string(),
    n: z.string(),
    e: z.string(),
    alg: z.string(),
  })
  .openapi({ required: ['kty', 'use', 'kid', 'n', 'e', 'alg'] })
  .openapi('OAuth2Key')

const OAuth2GetKeysSchema = z
  .object({ keys: z.array(OAuth2KeySchema) })
  .openapi({ required: ['keys'] })
  .openapi('OAuth2GetKeys')

const OAuth2GetOpenIDConnectUserInfoResponseSchema = z
  .object({
    sub: z.string(),
    email: z.string().nullable().exactOptional(),
    email_verified: z.boolean().exactOptional(),
    preferred_username: z.string().exactOptional(),
    nickname: z.string().nullable().exactOptional(),
    picture: z.string().exactOptional(),
    locale: z.string().exactOptional(),
  })
  .openapi({ required: ['sub'] })
  .openapi('OAuth2GetOpenIDConnectUserInfoResponse')

const OnboardingPromptOptionRequestSchema = z
  .object({
    id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    title: z.string().min(1).max(50),
    description: z.string().max(100).nullable().exactOptional(),
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().max(100).nullable().exactOptional(),
    emoji_animated: z.boolean().nullable().exactOptional(),
    role_ids: z.array(SnowflakeTypeSchema).max(50).nullable().exactOptional(),
    channel_ids: z.array(SnowflakeTypeSchema).max(50).nullable().exactOptional(),
  })
  .openapi({ required: ['title'] })
  .openapi('OnboardingPromptOptionRequest')

const PinnedMessageResponseSchema = z
  .object({ pinned_at: z.iso.datetime(), message: MessageResponseSchema })
  .openapi({ required: ['pinned_at', 'message'] })
  .openapi('PinnedMessageResponse')

const PinnedMessagesResponseSchema = z
  .object({ items: z.array(PinnedMessageResponseSchema), has_more: z.boolean() })
  .openapi({ required: ['items', 'has_more'] })
  .openapi('PinnedMessagesResponse')

const PollAnswerDetailsResponseSchema = z
  .object({ users: z.array(UserResponseSchema) })
  .openapi({ required: ['users'] })
  .openapi('PollAnswerDetailsResponse')

const PongInteractionCallbackRequestSchema = z
  .object({ type: InteractionCallbackTypesSchema })
  .openapi({ required: ['type'] })
  .openapi('PongInteractionCallbackRequest')

const PremiumTypesSchema = z
  .xor([
    z.literal(0).openapi({ title: 'NONE', description: 'None' }),
    z.literal(1).openapi({ title: 'TIER_1', description: 'Nitro Classic' }),
    z.literal(2).openapi({ title: 'TIER_2', description: 'Nitro Standard' }),
    z.literal(3).openapi({ title: 'TIER_0', description: 'Nitro Basic' }),
  ])
  .openapi('PremiumTypes')

const TeamMembershipStatesSchema = z
  .xor([
    z.literal(1).openapi({ title: 'INVITED', description: 'User has been invited to the team.' }),
    z
      .literal(2)
      .openapi({ title: 'ACCEPTED', description: 'User has accepted the team invitation.' }),
  ])
  .openapi('TeamMembershipStates')

const TeamMemberResponseSchema = z
  .object({
    user: UserResponseSchema,
    team_id: SnowflakeTypeSchema,
    membership_state: TeamMembershipStatesSchema,
  })
  .openapi({ required: ['user', 'team_id', 'membership_state'] })
  .openapi('TeamMemberResponse')

const TeamResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    icon: z.string().nullable().exactOptional(),
    name: z.string(),
    owner_user_id: SnowflakeTypeSchema,
    members: z.array(TeamMemberResponseSchema),
  })
  .openapi({ required: ['id', 'name', 'owner_user_id', 'members'] })
  .openapi('TeamResponse')

const PrivateApplicationResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    icon: z.string().nullable().exactOptional(),
    description: z.string(),
    type: z.xor([z.null().nullable(), ApplicationTypesSchema]).exactOptional(),
    cover_image: z.string().exactOptional(),
    primary_sku_id: SnowflakeTypeSchema.exactOptional(),
    bot: UserResponseSchema.exactOptional(),
    slug: z.string().exactOptional(),
    guild_id: SnowflakeTypeSchema.exactOptional(),
    rpc_origins: z.array(z.string().nullable()).exactOptional(),
    bot_public: z.boolean().exactOptional(),
    bot_require_code_grant: z.boolean().exactOptional(),
    terms_of_service_url: z.url().exactOptional(),
    privacy_policy_url: z.url().exactOptional(),
    custom_install_url: z.url().exactOptional(),
    install_params: ApplicationOAuth2InstallParamsResponseSchema.exactOptional(),
    integration_types_config: z
      .record(z.string(), ApplicationIntegrationTypeConfigurationResponseSchema)
      .exactOptional(),
    verify_key: z.string(),
    flags: z.int32(),
    max_participants: z.int32().nullable().exactOptional(),
    tags: z.array(z.string()).exactOptional(),
    redirect_uris: z.array(z.url().nullable()),
    interactions_endpoint_url: z.url().nullable().exactOptional(),
    role_connections_verification_url: z.url().nullable().exactOptional(),
    owner: UserResponseSchema,
    approximate_guild_count: z.int32().nullable().exactOptional(),
    approximate_user_install_count: z.int32(),
    approximate_user_authorization_count: z.int32(),
    explicit_content_filter: ApplicationExplicitContentFilterTypesSchema,
    team: z.xor([z.null().nullable(), TeamResponseSchema]).exactOptional(),
  })
  .openapi({
    required: [
      'id',
      'name',
      'description',
      'verify_key',
      'flags',
      'redirect_uris',
      'owner',
      'approximate_user_install_count',
      'approximate_user_authorization_count',
      'explicit_content_filter',
    ],
  })
  .openapi('PrivateApplicationResponse')

const PrivateGuildMemberResponseSchema = z
  .object({
    avatar: z.string().nullable().exactOptional(),
    avatar_decoration_data: z
      .xor([z.null().nullable(), UserAvatarDecorationResponseSchema])
      .exactOptional(),
    banner: z.string().nullable().exactOptional(),
    communication_disabled_until: z.iso.datetime().nullable().exactOptional(),
    flags: z.int32(),
    joined_at: z.iso.datetime(),
    nick: z.string().nullable().exactOptional(),
    pending: z.boolean(),
    premium_since: z.iso.datetime().nullable().exactOptional(),
    roles: z.array(SnowflakeTypeSchema),
    collectibles: z.xor([z.null().nullable(), UserCollectiblesResponseSchema]).exactOptional(),
    user: UserResponseSchema,
    mute: z.boolean(),
    deaf: z.boolean(),
    permissions: z.string().exactOptional(),
  })
  .openapi({ required: ['flags', 'joined_at', 'pending', 'roles', 'user', 'mute', 'deaf'] })
  .openapi('PrivateGuildMemberResponse')

const ProvisionalTokenResponseSchema = z
  .object({
    token_type: z.string(),
    access_token: z.string(),
    expires_in: z.int32(),
    scope: z.string(),
    id_token: z.string(),
    refresh_token: z.string().nullable().exactOptional(),
    scopes: z.array(z.string()).nullable().exactOptional(),
    expires_at_s: z.int32().nullable().exactOptional(),
  })
  .openapi({ required: ['token_type', 'access_token', 'expires_in', 'scope', 'id_token'] })
  .openapi('ProvisionalTokenResponse')

const PruneGuildRequestSchema = z
  .object({
    days: z.int().min(1).max(30).nullable().exactOptional(),
    compute_prune_count: z.boolean().nullable().exactOptional(),
    include_roles: z
      .xor([z.string(), z.array(SnowflakeTypeSchema).max(100), z.null().nullable()])
      .exactOptional(),
  })
  .openapi('PruneGuildRequest')

const ReactionTypesSchema = z
  .xor([
    z.literal(0).openapi({ title: 'NORMAL', description: 'Normal reaction type' }),
    z.literal(1).openapi({ title: 'BURST', description: 'Burst reaction type' }),
  ])
  .openapi('ReactionTypes')

const SDKMessageRequestSchema = z
  .object({
    content: z.string().max(4000).nullable().exactOptional(),
    embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
    allowed_mentions: z
      .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
      .exactOptional(),
    sticker_ids: z.array(SnowflakeTypeSchema).max(3).nullable().exactOptional(),
    components: z
      .array(
        z.xor([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      )
      .max(40)
      .nullable()
      .exactOptional(),
    flags: z.int().nullable().exactOptional(),
    attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
    poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
    shared_client_theme: z
      .xor([z.null().nullable(), CustomClientThemeShareRequestSchema])
      .exactOptional(),
    confetti_potion: z
      .xor([z.null().nullable(), ConfettiPotionCreateRequestSchema])
      .exactOptional(),
    message_reference: z.xor([z.null().nullable(), MessageReferenceRequestSchema]).exactOptional(),
    nonce: z
      .xor([
        z.int64().min(-9223372036854776000n).max(9223372036854776000n),
        z.string().max(25),
        z.null().nullable(),
      ])
      .exactOptional(),
    enforce_nonce: z.boolean().nullable().exactOptional(),
    tts: z.boolean().nullable().exactOptional(),
  })
  .openapi('SDKMessageRequest')

const ScoreCursorSchema: z.ZodType<ScoreCursorType> = z
  .lazy(() =>
    z
      .object({
        type: SearchCursorTypeSchema,
        score: z.xor([z.null().nullable(), ScoreCursorInnerScoreCursorSchema]).exactOptional(),
      })
      .openapi({ required: ['type'] }),
  )
  .openapi('ScoreCursor')

const SearchIndexNotReadyResponseSchema = z
  .object({
    message: z.string(),
    code: z.int32(),
    documents_indexed: z.int32(),
    retry_after: z.int32(),
  })
  .openapi({ required: ['message', 'code', 'documents_indexed', 'retry_after'] })
  .openapi('SearchIndexNotReadyResponse')

const SearchableEmbedTypeSchema = z
  .xor([
    z.literal('image').openapi({ title: 'IMAGE' }),
    z.literal('video').openapi({ title: 'VIDEO' }),
    z.literal('gif').openapi({ title: 'GIFV' }),
    z.literal('sound').openapi({ title: 'SOUND' }),
    z.literal('article').openapi({ title: 'ARTICLE' }),
  ])
  .openapi('SearchableEmbedType')

const WebhookSlackEmbedFieldSchema = z
  .object({
    name: z.string().max(152133).nullable().exactOptional(),
    value: z.string().max(152133).nullable().exactOptional(),
    inline: z.boolean().nullable().exactOptional(),
  })
  .openapi('WebhookSlackEmbedField')

const WebhookSlackEmbedSchema = z
  .object({
    title: z.string().max(152133).nullable().exactOptional(),
    title_link: z.url().max(2048).nullable().exactOptional(),
    text: z.string().max(152133).nullable().exactOptional(),
    color: z
      .string()
      .regex(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)
      .max(7)
      .nullable()
      .exactOptional(),
    ts: z.int().nullable().exactOptional(),
    pretext: z.string().max(152133).nullable().exactOptional(),
    footer: z.string().max(152133).nullable().exactOptional(),
    footer_icon: z.url().max(2048).nullable().exactOptional(),
    author_name: z.string().max(152133).nullable().exactOptional(),
    author_link: z.url().max(2048).nullable().exactOptional(),
    author_icon: z.url().max(2048).nullable().exactOptional(),
    image_url: z.url().max(2048).nullable().exactOptional(),
    thumb_url: z.url().max(2048).nullable().exactOptional(),
    fields: z.array(WebhookSlackEmbedFieldSchema).max(1521).nullable().exactOptional(),
  })
  .openapi('WebhookSlackEmbed')

const SlackWebhookSchema = z
  .object({
    text: z.string().max(2000).nullable().exactOptional(),
    username: z.string().max(152133).nullable().exactOptional(),
    icon_url: z.url().max(2048).nullable().exactOptional(),
    attachments: z.array(WebhookSlackEmbedSchema).max(1521).nullable().exactOptional(),
  })
  .openapi('SlackWebhook')

const SortingModeSchema = z
  .xor([
    z.literal('relevance').openapi({ title: 'RELEVANCE' }),
    z.literal('timestamp').openapi({ title: 'TIMESTAMP' }),
  ])
  .openapi('SortingMode')

const SortingOrderSchema = z
  .xor([z.literal('asc').openapi({ title: 'ASC' }), z.literal('desc').openapi({ title: 'DESC' })])
  .openapi('SortingOrder')

const SoundboardCreateRequestSchema = z
  .object({
    name: z.string().min(2).max(32),
    volume: z.number().min(0).max(1).nullable().exactOptional(),
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().min(1).max(32).nullable().exactOptional(),
    sound: z.string(),
  })
  .openapi({ required: ['name', 'sound'] })
  .openapi('SoundboardCreateRequest')

const SoundboardPatchRequestPartialSchema = z
  .object({
    name: z.string().min(2).max(32).exactOptional(),
    volume: z.number().min(0).max(1).nullable().exactOptional(),
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().min(1).max(32).nullable().exactOptional(),
  })
  .openapi('SoundboardPatchRequestPartial')

const SoundboardSoundSendRequestSchema = z
  .object({
    sound_id: SnowflakeTypeSchema,
    source_guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  })
  .openapi({ required: ['sound_id'] })
  .openapi('SoundboardSoundSendRequest')

const StageInstancesPrivacyLevelsSchema = z
  .xor([
    z
      .literal(1)
      .openapi({
        title: 'PUBLIC',
        description: 'The Stage instance is visible publicly. (deprecated)',
      }),
    z
      .literal(2)
      .openapi({
        title: 'GUILD_ONLY',
        description: 'The Stage instance is visible publicly. (deprecated)',
      }),
  ])
  .openapi('StageInstancesPrivacyLevels')

const StageInstanceResponseSchema = z
  .object({
    guild_id: SnowflakeTypeSchema,
    channel_id: SnowflakeTypeSchema,
    topic: z.string(),
    privacy_level: StageInstancesPrivacyLevelsSchema,
    id: SnowflakeTypeSchema,
    discoverable_disabled: z.boolean(),
    guild_scheduled_event_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  })
  .openapi({
    required: ['guild_id', 'channel_id', 'topic', 'privacy_level', 'id', 'discoverable_disabled'],
  })
  .openapi('StageInstanceResponse')

const StageScheduledEventCreateRequestSchema = z
  .object({
    name: z.string().max(100),
    description: z.string().max(1000).nullable().exactOptional(),
    image: z.string().nullable().exactOptional(),
    scheduled_start_time: z.iso.datetime(),
    scheduled_end_time: z.iso.datetime().nullable().exactOptional(),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    recurrence_rule: z.xor([z.null().nullable(), RecurrenceRuleSchema]).exactOptional(),
    entity_metadata: z
      .xor([z.null().nullable(), EntityMetadataStageInstanceSchema])
      .exactOptional(),
  })
  .openapi({ required: ['name', 'scheduled_start_time', 'privacy_level', 'entity_type'] })
  .openapi('StageScheduledEventCreateRequest')

const StageScheduledEventPatchRequestPartialSchema = z
  .object({
    status: z.xor([z.null().nullable(), GuildScheduledEventStatusesSchema]).exactOptional(),
    name: z.string().max(100).exactOptional(),
    description: z.string().max(1000).nullable().exactOptional(),
    image: z.string().nullable().exactOptional(),
    scheduled_start_time: z.iso.datetime().exactOptional(),
    scheduled_end_time: z.iso.datetime().nullable().exactOptional(),
    entity_type: z.xor([z.null().nullable(), GuildScheduledEventEntityTypesSchema]).exactOptional(),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema.exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    recurrence_rule: z.xor([z.null().nullable(), RecurrenceRuleSchema]).exactOptional(),
    entity_metadata: z
      .xor([z.null().nullable(), EntityMetadataStageInstanceSchema])
      .exactOptional(),
  })
  .openapi('StageScheduledEventPatchRequestPartial')

const StickerPackResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    sku_id: SnowflakeTypeSchema,
    name: z.string(),
    description: z.string().nullable().exactOptional(),
    stickers: z.array(StandardStickerResponseSchema),
    cover_sticker_id: SnowflakeTypeSchema.exactOptional(),
    banner_asset_id: SnowflakeTypeSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'sku_id', 'name', 'stickers'] })
  .openapi('StickerPackResponse')

const StickerPackCollectionResponseSchema = z
  .object({ sticker_packs: z.array(StickerPackResponseSchema) })
  .openapi({ required: ['sticker_packs'] })
  .openapi('StickerPackCollectionResponse')

const ThreadSearchResponseSchema = z
  .object({
    threads: z.array(ThreadResponseSchema),
    members: z.array(ThreadMemberResponseSchema),
    has_more: z.boolean(),
    first_messages: z.array(MessageResponseSchema).exactOptional(),
    total_results: z.int32(),
  })
  .openapi({ required: ['threads', 'members', 'has_more', 'total_results'] })
  .openapi('ThreadSearchResponse')

const ThreadSortingModeSchema = z
  .xor([
    z.literal('relevance').openapi({ title: 'RELEVANCE' }),
    z.literal('creation_time').openapi({ title: 'CREATION_TIME' }),
    z.literal('last_message_time').openapi({ title: 'LAST_MESSAGE_TIME' }),
    z.literal('archive_time').openapi({ title: 'ARCHIVE_TIME' }),
  ])
  .openapi('ThreadSortingMode')

const ThreadsResponseSchema = z
  .object({
    threads: z.array(ThreadResponseSchema),
    members: z.array(ThreadMemberResponseSchema),
    has_more: z.boolean(),
    first_messages: z.array(MessageResponseSchema).exactOptional(),
  })
  .openapi({ required: ['threads', 'members', 'has_more'] })
  .openapi('ThreadsResponse')

const TimestampCursorSchema = z
  .object({ type: SearchCursorTypeSchema, timestamp: SnowflakeTypeSchema })
  .openapi({ required: ['type', 'timestamp'] })
  .openapi('TimestampCursor')

const TypingIndicatorResponseSchema = z.object({}).openapi('TypingIndicatorResponse')

const UnbanUserFromGuildRequestSchema = z.object({}).openapi('UnbanUserFromGuildRequest')

const UpdateApplicationUserRoleConnectionRequestSchema = z
  .object({
    platform_name: z.string().max(50).nullable().exactOptional(),
    platform_username: z.string().max(100).nullable().exactOptional(),
    metadata: z
      .record(z.string(), z.string().min(1).max(100))
      .nullable()
      .exactOptional()
      .openapi({ maxProperties: 5 }),
  })
  .openapi('UpdateApplicationUserRoleConnectionRequest')

const UpdateDMRequestPartialSchema = z
  .object({ name: z.string().min(0).max(100).nullable().exactOptional() })
  .openapi('UpdateDMRequestPartial')

const UpdateGroupDMRequestPartialSchema = z
  .object({
    name: z.string().min(0).max(100).nullable().exactOptional(),
    icon: z.string().nullable().exactOptional(),
  })
  .openapi('UpdateGroupDMRequestPartial')

const UpdateThreadTagRequestSchema = z
  .object({
    name: z.string().min(0).max(50),
    emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    emoji_name: z.string().max(100).nullable().exactOptional(),
    moderated: z.boolean().nullable().exactOptional(),
    id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('UpdateThreadTagRequest')

const UpdateGuildChannelRequestPartialSchema = z
  .object({
    type: z.xor([z.null().nullable(), ChannelTypesSchema]).exactOptional(),
    name: z.string().min(1).max(100).exactOptional(),
    position: z.int32().min(0).nullable().exactOptional(),
    topic: z.string().min(0).max(4096).nullable().exactOptional(),
    bitrate: z.int32().min(8000).nullable().exactOptional(),
    user_limit: z.int32().min(0).nullable().exactOptional(),
    nsfw: z.boolean().nullable().exactOptional(),
    rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
    parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    permission_overwrites: z
      .array(ChannelPermissionOverwriteRequestSchema)
      .max(100)
      .nullable()
      .exactOptional(),
    rtc_region: z.string().nullable().exactOptional(),
    video_quality_mode: z.xor([z.null().nullable(), VideoQualityModesSchema]).exactOptional(),
    default_auto_archive_duration: z
      .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
      .exactOptional(),
    default_reaction_emoji: z
      .xor([z.null().nullable(), UpdateDefaultReactionEmojiRequestSchema])
      .exactOptional(),
    default_thread_rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
    default_sort_order: z.xor([z.null().nullable(), ThreadSortOrderSchema]).exactOptional(),
    default_forum_layout: z.xor([z.null().nullable(), ForumLayoutSchema]).exactOptional(),
    default_tag_setting: z.xor([z.null().nullable(), ThreadSearchTagSettingSchema]).exactOptional(),
    flags: z.int().nullable().exactOptional(),
    available_tags: z.array(UpdateThreadTagRequestSchema).max(20).nullable().exactOptional(),
  })
  .openapi('UpdateGuildChannelRequestPartial')

const UpdateOnboardingPromptRequestSchema = z
  .object({
    title: z.string().min(1).max(100),
    options: z.array(OnboardingPromptOptionRequestSchema).min(1).max(50),
    single_select: z.boolean().nullable().exactOptional(),
    required: z.boolean().nullable().exactOptional(),
    in_onboarding: z.boolean().nullable().exactOptional(),
    type: z.xor([z.null().nullable(), OnboardingPromptTypeSchema]).exactOptional(),
    id: SnowflakeTypeSchema,
  })
  .openapi({ required: ['title', 'options', 'id'] })
  .openapi('UpdateOnboardingPromptRequest')

const UpdateGuildOnboardingRequestSchema = z
  .object({
    prompts: z.array(UpdateOnboardingPromptRequestSchema).max(15).nullable().exactOptional(),
    enabled: z.boolean().nullable().exactOptional(),
    default_channel_ids: z.array(SnowflakeTypeSchema).max(500).nullable().exactOptional(),
    mode: z.xor([z.null().nullable(), GuildOnboardingModeSchema]).exactOptional(),
  })
  .openapi('UpdateGuildOnboardingRequest')

const UpdateMessageInteractionCallbackRequestSchema = z
  .object({
    type: InteractionCallbackTypesSchema,
    data: z
      .xor([z.null().nullable(), IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema])
      .exactOptional(),
  })
  .openapi({ required: ['type'] })
  .openapi('UpdateMessageInteractionCallbackRequest')

const UpdateRolePositionsRequestSchema = z
  .object({
    id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    position: z.int32().nullable().exactOptional(),
  })
  .openapi('UpdateRolePositionsRequest')

const UpdateRoleRequestPartialSchema = z
  .object({
    name: z.string().max(100).nullable().exactOptional(),
    permissions: z.int().nullable().exactOptional(),
    color: z.int().min(0).max(16777215).nullable().exactOptional(),
    hoist: z.boolean().nullable().exactOptional(),
    mentionable: z.boolean().nullable().exactOptional(),
    icon: z.string().nullable().exactOptional(),
    unicode_emoji: z.string().max(100).nullable().exactOptional(),
  })
  .openapi('UpdateRoleRequestPartial')

const UpdateSelfVoiceStateRequestPartialSchema = z
  .object({
    request_to_speak_timestamp: z.iso.datetime().nullable().exactOptional(),
    suppress: z.boolean().nullable().exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  })
  .openapi('UpdateSelfVoiceStateRequestPartial')

const UpdateThreadRequestPartialSchema = z
  .object({
    name: z.string().min(0).max(100).nullable().exactOptional(),
    archived: z.boolean().nullable().exactOptional(),
    locked: z.boolean().nullable().exactOptional(),
    invitable: z.boolean().nullable().exactOptional(),
    auto_archive_duration: z
      .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
      .exactOptional(),
    rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
    flags: z.int().nullable().exactOptional(),
    applied_tags: z.array(SnowflakeTypeSchema).max(5).nullable().exactOptional(),
    bitrate: z.int32().min(8000).nullable().exactOptional(),
    user_limit: z.int().min(0).max(99).nullable().exactOptional(),
    rtc_region: z.string().nullable().exactOptional(),
    video_quality_mode: z.xor([z.null().nullable(), VideoQualityModesSchema]).exactOptional(),
  })
  .openapi('UpdateThreadRequestPartial')

const UpdateVoiceStateRequestPartialSchema = z
  .object({
    suppress: z.boolean().nullable().exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  })
  .openapi('UpdateVoiceStateRequestPartial')

const UserGuildOnboardingResponseSchema = z
  .object({
    guild_id: SnowflakeTypeSchema,
    prompts: z.array(OnboardingPromptResponseSchema),
    default_channel_ids: z.array(SnowflakeTypeSchema),
    enabled: z.boolean(),
  })
  .openapi({ required: ['guild_id', 'prompts', 'default_channel_ids', 'enabled'] })
  .openapi('UserGuildOnboardingResponse')

const UserPIIResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    username: z.string(),
    avatar: z.string().nullable().exactOptional(),
    discriminator: z.string(),
    public_flags: z.int32(),
    flags: Int53TypeSchema,
    bot: z.boolean().exactOptional(),
    system: z.boolean().exactOptional(),
    banner: z.string().nullable().exactOptional(),
    accent_color: z.int32().nullable().exactOptional(),
    global_name: z.string().nullable().exactOptional(),
    avatar_decoration_data: z
      .xor([z.null().nullable(), UserAvatarDecorationResponseSchema])
      .exactOptional(),
    collectibles: z.xor([z.null().nullable(), UserCollectiblesResponseSchema]).exactOptional(),
    primary_guild: z.xor([z.null().nullable(), UserPrimaryGuildResponseSchema]).exactOptional(),
    mfa_enabled: z.boolean(),
    locale: AvailableLocalesEnumSchema,
    premium_type: PremiumTypesSchema.exactOptional(),
    email: z.string().nullable().exactOptional(),
    verified: z.boolean().exactOptional(),
  })
  .openapi({
    required: ['id', 'username', 'discriminator', 'public_flags', 'flags', 'mfa_enabled', 'locale'],
  })
  .openapi('UserPIIResponse')

const VanityURLErrorResponseSchema = z
  .object({ message: z.string(), code: z.int32() })
  .openapi({ required: ['message', 'code'] })
  .openapi('VanityURLErrorResponse')

const VanityURLResponseSchema = z
  .object({
    code: z.string().nullable().exactOptional(),
    uses: z.int32(),
    error: z.xor([z.null().nullable(), VanityURLErrorResponseSchema]).exactOptional(),
  })
  .openapi({ required: ['uses'] })
  .openapi('VanityURLResponse')

const VoiceRegionResponseSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    custom: z.boolean(),
    deprecated: z.boolean(),
    optimal: z.boolean(),
  })
  .openapi({ required: ['id', 'name', 'custom', 'deprecated', 'optimal'] })
  .openapi('VoiceRegionResponse')

const VoiceScheduledEventCreateRequestSchema = z
  .object({
    name: z.string().max(100),
    description: z.string().max(1000).nullable().exactOptional(),
    image: z.string().nullable().exactOptional(),
    scheduled_start_time: z.iso.datetime(),
    scheduled_end_time: z.iso.datetime().nullable().exactOptional(),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    recurrence_rule: z.xor([z.null().nullable(), RecurrenceRuleSchema]).exactOptional(),
    entity_metadata: z.xor([z.null().nullable(), EntityMetadataVoiceSchema]).exactOptional(),
  })
  .openapi({ required: ['name', 'scheduled_start_time', 'privacy_level', 'entity_type'] })
  .openapi('VoiceScheduledEventCreateRequest')

const VoiceScheduledEventPatchRequestPartialSchema = z
  .object({
    status: z.xor([z.null().nullable(), GuildScheduledEventStatusesSchema]).exactOptional(),
    name: z.string().max(100).exactOptional(),
    description: z.string().max(1000).nullable().exactOptional(),
    image: z.string().nullable().exactOptional(),
    scheduled_start_time: z.iso.datetime().exactOptional(),
    scheduled_end_time: z.iso.datetime().nullable().exactOptional(),
    entity_type: z.xor([z.null().nullable(), GuildScheduledEventEntityTypesSchema]).exactOptional(),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema.exactOptional(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    recurrence_rule: z.xor([z.null().nullable(), RecurrenceRuleSchema]).exactOptional(),
    entity_metadata: z.xor([z.null().nullable(), EntityMetadataVoiceSchema]).exactOptional(),
  })
  .openapi('VoiceScheduledEventPatchRequestPartial')

const VoiceStateResponseSchema = z
  .object({
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    deaf: z.boolean(),
    guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    member: GuildMemberResponseSchema.exactOptional(),
    mute: z.boolean(),
    request_to_speak_timestamp: z.iso.datetime().nullable().exactOptional(),
    suppress: z.boolean(),
    self_stream: z.boolean().nullable().exactOptional(),
    self_deaf: z.boolean(),
    self_mute: z.boolean(),
    self_video: z.boolean(),
    session_id: z.string(),
    user_id: SnowflakeTypeSchema,
  })
  .openapi({
    required: [
      'deaf',
      'mute',
      'suppress',
      'self_deaf',
      'self_mute',
      'self_video',
      'session_id',
      'user_id',
    ],
  })
  .openapi('VoiceStateResponse')

const WelcomeScreenPatchRequestPartialSchema = z
  .object({
    description: z.string().max(140).nullable().exactOptional(),
    welcome_channels: z.array(GuildWelcomeChannelSchema).max(5).nullable().exactOptional(),
    enabled: z.boolean().nullable().exactOptional(),
  })
  .openapi('WelcomeScreenPatchRequestPartial')

const WidgetActivitySchema = z
  .object({ name: z.string() })
  .openapi({ required: ['name'] })
  .openapi('WidgetActivity')

const WidgetChannelSchema = z
  .object({ id: SnowflakeTypeSchema, name: z.string(), position: z.int32() })
  .openapi({ required: ['id', 'name', 'position'] })
  .openapi('WidgetChannel')

const WidgetImageStylesSchema = z
  .xor([
    z
      .literal('shield')
      .openapi({
        title: 'SHIELD',
        description: 'shield style widget with Discord icon and guild members online count',
      }),
    z
      .literal('banner1')
      .openapi({
        title: 'BANNER1',
        description:
          'large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget',
      }),
    z
      .literal('banner2')
      .openapi({
        title: 'BANNER2',
        description:
          'smaller widget style with guild icon, name and online count. Split on the right with Discord logo',
      }),
    z
      .literal('banner3')
      .openapi({
        title: 'BANNER3',
        description:
          'large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right',
      }),
    z
      .literal('banner4')
      .openapi({
        title: 'BANNER4',
        description:
          'large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom',
      }),
  ])
  .openapi('WidgetImageStyles')

const WidgetUserDiscriminatorSchema = z
  .xor([z.literal('0000').openapi({ title: 'ZEROES' })])
  .openapi('WidgetUserDiscriminator')

const WidgetMemberSchema = z
  .object({
    id: z.string(),
    username: z.string(),
    discriminator: WidgetUserDiscriminatorSchema,
    avatar: z.null().nullable().exactOptional(),
    status: z.string(),
    avatar_url: z.url(),
    activity: WidgetActivitySchema.exactOptional(),
    deaf: z.boolean().exactOptional(),
    mute: z.boolean().exactOptional(),
    self_deaf: z.boolean().exactOptional(),
    self_mute: z.boolean().exactOptional(),
    suppress: z.boolean().exactOptional(),
    channel_id: SnowflakeTypeSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'username', 'discriminator', 'status', 'avatar_url'] })
  .openapi('WidgetMember')

const WidgetResponseSchema = z
  .object({
    id: SnowflakeTypeSchema,
    name: z.string(),
    instant_invite: z.string().nullable().exactOptional(),
    channels: z.array(WidgetChannelSchema),
    members: z.array(WidgetMemberSchema),
    presence_count: z.int32(),
  })
  .openapi({ required: ['id', 'name', 'channels', 'members', 'presence_count'] })
  .openapi('WidgetResponse')

const WidgetSettingsResponseSchema = z
  .object({
    enabled: z.boolean(),
    channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  })
  .openapi({ required: ['enabled'] })
  .openapi('WidgetSettingsResponse')

const ErrorDetailsSchema: z.ZodType<ErrorDetailsType> = z
  .lazy(() => z.xor([z.record(z.string(), ErrorDetailsSchema), InnerErrorsSchema]))
  .openapi('ErrorDetails')

const ErrorResponseSchema = ErrorSchema.and(
  z.object({ errors: ErrorDetailsSchema.exactOptional() }),
)
  .openapi({ description: 'Errors object returned by the Discord API' })
  .openapi('ErrorResponse')

const RatelimitedResponseSchema = ErrorSchema.and(
  z
    .object({
      retry_after: z
        .number()
        .openapi({ description: 'The number of seconds to wait before retrying your request' }),
      global: z
        .boolean()
        .openapi({
          description:
            'Whether you are being ratelimited by the global ratelimit or a per-endpoint ratelimit',
        }),
    })
    .openapi({ required: ['retry_after', 'global'] }),
)
  .openapi({ description: 'Ratelimit error object returned by the Discord API' })
  .openapi('RatelimitedResponse')

const BotTokenSecurityScheme = {
  type: 'apiKey',
  description: 'Discord bot token',
  name: 'Authorization',
  in: 'header',
}

const OAuth2SecurityScheme = {
  type: 'oauth2',
  flows: {
    implicit: {
      authorizationUrl: 'https://discord.com/api/oauth2/authorize',
      refreshUrl: 'https://discord.com/api/oauth2/token',
      scopes: {
        'activities.invites.write':
          'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
        'activities.read':
          'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
        'activities.write':
          "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
        'applications.builds.read': "allows your app to read build data for a user's applications",
        'applications.builds.upload':
          "allows your app to upload/update builds for a user's applications - requires Discord approval",
        'applications.commands': 'allows your app to use commands in a guild',
        'applications.commands.permissions.update':
          'allows your app to update permissions for its commands in a guild a user has permissions to',
        'applications.entitlements':
          "allows your app to read entitlements for a user's applications",
        'applications.store.update':
          "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
        bot: "for oauth2 bots, this puts the bot in the user's selected guild by default",
        connections: 'allows /users/@me/connections to return linked third-party accounts',
        'dm_channels.read':
          "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
        email: 'enables /users/@me to return an email',
        'gdm.join': 'allows your app to join users to a group dm',
        guilds: "allows /users/@me/guilds to return basic information about all of a user's guilds",
        'guilds.join':
          'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
        'guilds.members.read':
          "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
        identify: 'allows /users/@me without email',
        'messages.read':
          'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
        openid:
          'for OpenID Connect, this allows your app to receive user id and basic profile information',
        'relationships.read':
          "allows your app to know a user's friends and implicit relationships - requires Discord approval",
        rpc: "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
        'rpc.activities.write':
          "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
        'rpc.notifications.read':
          'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
        'rpc.screenshare.read':
          "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
        'rpc.screenshare.write':
          "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
        'rpc.video.read':
          "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
        'rpc.video.write':
          "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
        'rpc.voice.read':
          "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
        'rpc.voice.write':
          "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
        voice:
          "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
        'webhook.incoming':
          'this generates a webhook that is returned in the oauth token response for authorization code grants',
      },
    },
    clientCredentials: {
      tokenUrl: 'https://discord.com/api/oauth2/token',
      refreshUrl: 'https://discord.com/api/oauth2/token',
      scopes: {
        'activities.invites.write':
          'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
        'activities.read':
          'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
        'activities.write':
          "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
        'applications.builds.read': "allows your app to read build data for a user's applications",
        'applications.builds.upload':
          "allows your app to upload/update builds for a user's applications - requires Discord approval",
        'applications.commands': 'allows your app to use commands in a guild',
        'applications.commands.permissions.update':
          'allows your app to update permissions for its commands in a guild a user has permissions to',
        'applications.commands.update':
          'allows your app to update its commands using a Bearer token - client credentials grant only',
        'applications.entitlements':
          "allows your app to read entitlements for a user's applications",
        'applications.store.update':
          "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
        bot: "for oauth2 bots, this puts the bot in the user's selected guild by default",
        connections: 'allows /users/@me/connections to return linked third-party accounts',
        'dm_channels.read':
          "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
        email: 'enables /users/@me to return an email',
        'gdm.join': 'allows your app to join users to a group dm',
        guilds: "allows /users/@me/guilds to return basic information about all of a user's guilds",
        'guilds.join':
          'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
        'guilds.members.read':
          "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
        identify: 'allows /users/@me without email',
        'messages.read':
          'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
        openid:
          'for OpenID Connect, this allows your app to receive user id and basic profile information',
        'relationships.read':
          "allows your app to know a user's friends and implicit relationships - requires Discord approval",
        rpc: "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
        'rpc.activities.write':
          "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
        'rpc.notifications.read':
          'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
        'rpc.screenshare.read':
          "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
        'rpc.screenshare.write':
          "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
        'rpc.video.read':
          "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
        'rpc.video.write':
          "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
        'rpc.voice.read':
          "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
        'rpc.voice.write':
          "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
        voice:
          "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
        'webhook.incoming':
          'this generates a webhook that is returned in the oauth token response for authorization code grants',
      },
    },
    authorizationCode: {
      authorizationUrl: 'https://discord.com/api/oauth2/authorize',
      tokenUrl: 'https://discord.com/api/oauth2/token',
      refreshUrl: 'https://discord.com/api/oauth2/token',
      scopes: {
        'activities.invites.write':
          'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
        'activities.read':
          'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
        'activities.write':
          "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
        'applications.builds.read': "allows your app to read build data for a user's applications",
        'applications.builds.upload':
          "allows your app to upload/update builds for a user's applications - requires Discord approval",
        'applications.commands': 'allows your app to use commands in a guild',
        'applications.commands.permissions.update':
          'allows your app to update permissions for its commands in a guild a user has permissions to',
        'applications.entitlements':
          "allows your app to read entitlements for a user's applications",
        'applications.store.update':
          "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
        bot: "for oauth2 bots, this puts the bot in the user's selected guild by default",
        connections: 'allows /users/@me/connections to return linked third-party accounts',
        'dm_channels.read':
          "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
        email: 'enables /users/@me to return an email',
        'gdm.join': 'allows your app to join users to a group dm',
        guilds: "allows /users/@me/guilds to return basic information about all of a user's guilds",
        'guilds.join':
          'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
        'guilds.members.read':
          "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
        identify: 'allows /users/@me without email',
        'messages.read':
          'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
        openid:
          'for OpenID Connect, this allows your app to receive user id and basic profile information',
        'relationships.read':
          "allows your app to know a user's friends and implicit relationships - requires Discord approval",
        'role_connections.write':
          "allows your app to update a user's connection and metadata for the app",
        rpc: "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
        'rpc.activities.write':
          "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
        'rpc.notifications.read':
          'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
        'rpc.screenshare.read':
          "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
        'rpc.screenshare.write':
          "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
        'rpc.video.read':
          "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
        'rpc.video.write':
          "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
        'rpc.voice.read':
          "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
        'rpc.voice.write':
          "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
        voice:
          "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
        'webhook.incoming':
          'this generates a webhook that is returned in the oauth token response for authorization code grants',
      },
    },
  },
}

const XRateLimitLimitHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({
    description: 'The maximum number of requests that can be made in the current ratelimit window',
  })

const XRateLimitRemainingHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'The number of requests remaining in the current ratelimit window' })

const XRateLimitResetHeaderSchema = z
  .number()
  .exactOptional()
  .openapi({
    description: 'A unix timestamp in seconds at which the current ratelimit window resets',
  })

const XRateLimitResetAfterHeaderSchema = z
  .number()
  .exactOptional()
  .openapi({ description: 'The duration in seconds until the current ratelimit window resets' })

const XRateLimitBucketHeaderSchema = z
  .string()
  .exactOptional()
  .openapi({ description: 'The bucket that the request belongs to' })

const ClientErrorResponse = {
  description: 'Client error response',
  headers: z.object({
    'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
    'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
    'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
    'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
    'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
  }),
  content: { 'application/json': { schema: ErrorResponseSchema } },
}

const ClientRatelimitedResponse = {
  description: 'Client ratelimited response',
  headers: z.object({
    'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
    'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
    'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
    'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
    'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
  }),
  content: { 'application/json': { schema: RatelimitedResponseSchema } },
}

export const getApplicationsMeRoute = createRoute({
  method: 'get',
  path: '/applications/@me',
  operationId: 'get_my_application',
  responses: {
    200: {
      description: '200 response for get_my_application',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: PrivateApplicationResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchApplicationsMeRoute = createRoute({
  method: 'patch',
  path: '/applications/@me',
  operationId: 'update_my_application',
  request: {
    body: {
      content: { 'application/json': { schema: ApplicationFormPartialSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_my_application',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: PrivateApplicationResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getApplicationsApplicationIdRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}',
  operationId: 'get_application',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_application',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: PrivateApplicationResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchApplicationsApplicationIdRoute = createRoute({
  method: 'patch',
  path: '/applications/{application_id}',
  operationId: 'update_application',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: ApplicationFormPartialSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_application',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: PrivateApplicationResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getApplicationsApplicationIdActivityInstancesInstanceIdRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/activity-instances/{instance_id}',
  operationId: 'applications_get_activity_instance',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      instance_id: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'instance_id',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for applications_get_activity_instance',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: EmbeddedActivityInstanceSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postApplicationsApplicationIdAttachmentRoute = createRoute({
  method: 'post',
  path: '/applications/{application_id}/attachment',
  operationId: 'upload_application_attachment',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({ file: z.string() }).openapi({ required: ['file'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for upload_application_attachment',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ActivitiesAttachmentResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [
    { BotToken: [] },
    {
      OAuth2: [
        'activities.invites.write',
        'activities.read',
        'activities.write',
        'applications.builds.read',
        'applications.builds.upload',
        'applications.commands',
        'applications.commands.permissions.update',
        'applications.commands.update',
        'applications.entitlements',
        'applications.store.update',
        'bot',
        'connections',
        'dm_channels.read',
        'email',
        'gdm.join',
        'guilds',
        'guilds.join',
        'guilds.members.read',
        'identify',
        'messages.read',
        'openid',
        'relationships.read',
        'role_connections.write',
        'rpc',
        'rpc.activities.write',
        'rpc.notifications.read',
        'rpc.screenshare.read',
        'rpc.screenshare.write',
        'rpc.video.read',
        'rpc.video.write',
        'rpc.voice.read',
        'rpc.voice.write',
        'voice',
        'webhook.incoming',
      ],
    },
  ],
})

export const getApplicationsApplicationIdCommandsRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/commands',
  operationId: 'list_application_commands',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      with_localizations: z
        .stringbool()
        .exactOptional()
        .openapi({
          param: { name: 'with_localizations', in: 'query', schema: { type: 'boolean' } },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_application_commands',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': { schema: z.array(ApplicationCommandResponseSchema).nullable() },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const putApplicationsApplicationIdCommandsRoute = createRoute({
  method: 'put',
  path: '/applications/{application_id}/commands',
  operationId: 'bulk_set_application_commands',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.array(ApplicationCommandUpdateRequestSchema).max(110).nullable(),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for bulk_set_application_commands',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': { schema: z.array(ApplicationCommandResponseSchema).nullable() },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const postApplicationsApplicationIdCommandsRoute = createRoute({
  method: 'post',
  path: '/applications/{application_id}/commands',
  operationId: 'create_application_command',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: ApplicationCommandCreateRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_application_command',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ApplicationCommandResponseSchema } },
    },
    201: {
      description: '201 response for create_application_command',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ApplicationCommandResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const getApplicationsApplicationIdCommandsCommandIdRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/commands/{command_id}',
  operationId: 'get_application_command',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      command_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'command_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_application_command',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ApplicationCommandResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const deleteApplicationsApplicationIdCommandsCommandIdRoute = createRoute({
  method: 'delete',
  path: '/applications/{application_id}/commands/{command_id}',
  operationId: 'delete_application_command',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      command_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'command_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_application_command',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const patchApplicationsApplicationIdCommandsCommandIdRoute = createRoute({
  method: 'patch',
  path: '/applications/{application_id}/commands/{command_id}',
  operationId: 'update_application_command',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      command_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'command_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: ApplicationCommandPatchRequestPartialSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_application_command',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ApplicationCommandResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const getApplicationsApplicationIdEmojisRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/emojis',
  operationId: 'list_application_emojis',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_application_emojis',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ListApplicationEmojisResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postApplicationsApplicationIdEmojisRoute = createRoute({
  method: 'post',
  path: '/applications/{application_id}/emojis',
  operationId: 'create_application_emoji',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ name: z.string().min(2).max(32), image: z.string() })
            .openapi({ required: ['name', 'image'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for create_application_emoji',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: EmojiResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getApplicationsApplicationIdEmojisEmojiIdRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/emojis/{emoji_id}',
  operationId: 'get_application_emoji',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'emoji_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_application_emoji',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: EmojiResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteApplicationsApplicationIdEmojisEmojiIdRoute = createRoute({
  method: 'delete',
  path: '/applications/{application_id}/emojis/{emoji_id}',
  operationId: 'delete_application_emoji',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'emoji_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_application_emoji',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchApplicationsApplicationIdEmojisEmojiIdRoute = createRoute({
  method: 'patch',
  path: '/applications/{application_id}/emojis/{emoji_id}',
  operationId: 'update_application_emoji',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'emoji_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({ name: z.string().min(2).max(32).exactOptional() }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_application_emoji',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: EmojiResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getApplicationsApplicationIdEntitlementsRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/entitlements',
  operationId: 'get_entitlements',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      user_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'user_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      sku_ids: z
        .xor([
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'sku_ids',
                in: 'query',
                schema: {
                  oneOf: [
                    { type: 'string' },
                    {
                      type: 'array',
                      items: {
                        oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SnowflakeType' }],
                      },
                      maxItems: 100,
                      uniqueItems: true,
                    },
                  ],
                },
              },
            }),
          z
            .array(
              z
                .xor([
                  z
                    .null()
                    .nullable()
                    .exactOptional()
                    .openapi({
                      param: {
                        name: 'sku_ids',
                        in: 'query',
                        schema: {
                          oneOf: [
                            { type: 'string' },
                            {
                              type: 'array',
                              items: {
                                oneOf: [
                                  { type: 'null' },
                                  { $ref: '#/components/schemas/SnowflakeType' },
                                ],
                              },
                              maxItems: 100,
                              uniqueItems: true,
                            },
                          ],
                        },
                      },
                    }),
                  SnowflakeTypeSchema,
                ])
                .exactOptional()
                .openapi({
                  param: {
                    name: 'sku_ids',
                    in: 'query',
                    schema: {
                      oneOf: [
                        { type: 'string' },
                        {
                          type: 'array',
                          items: {
                            oneOf: [
                              { type: 'null' },
                              { $ref: '#/components/schemas/SnowflakeType' },
                            ],
                          },
                          maxItems: 100,
                          uniqueItems: true,
                        },
                      ],
                    },
                  },
                }),
            )
            .max(100)
            .exactOptional()
            .openapi({
              param: {
                name: 'sku_ids',
                in: 'query',
                schema: {
                  oneOf: [
                    { type: 'string' },
                    {
                      type: 'array',
                      items: {
                        oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SnowflakeType' }],
                      },
                      maxItems: 100,
                      uniqueItems: true,
                    },
                  ],
                },
              },
            }),
        ])
        .exactOptional()
        .openapi({
          param: {
            name: 'sku_ids',
            in: 'query',
            schema: {
              oneOf: [
                { type: 'string' },
                {
                  type: 'array',
                  items: {
                    oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SnowflakeType' }],
                  },
                  maxItems: 100,
                  uniqueItems: true,
                },
              ],
            },
          },
        }),
      guild_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'guild_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      before: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'before',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      after: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'after',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      limit: z
        .int()
        .min(1)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 100 },
          },
        }),
      exclude_ended: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'exclude_ended', in: 'query', schema: { type: 'boolean' } } }),
      exclude_deleted: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'exclude_deleted', in: 'query', schema: { type: 'boolean' } } }),
      only_active: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'only_active', in: 'query', schema: { type: 'boolean' } } }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_entitlements',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.array(z.xor([z.null().nullable(), EntitlementResponseSchema])),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
})

export const postApplicationsApplicationIdEntitlementsRoute = createRoute({
  method: 'post',
  path: '/applications/{application_id}/entitlements',
  operationId: 'create_entitlement',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: CreateEntitlementRequestDataSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_entitlement',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: EntitlementResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getApplicationsApplicationIdEntitlementsEntitlementIdRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/entitlements/{entitlement_id}',
  operationId: 'get_entitlement',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      entitlement_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'entitlement_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_entitlement',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: EntitlementResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
})

export const deleteApplicationsApplicationIdEntitlementsEntitlementIdRoute = createRoute({
  method: 'delete',
  path: '/applications/{application_id}/entitlements/{entitlement_id}',
  operationId: 'delete_entitlement',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      entitlement_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'entitlement_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_entitlement',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
})

export const postApplicationsApplicationIdEntitlementsEntitlementIdConsumeRoute = createRoute({
  method: 'post',
  path: '/applications/{application_id}/entitlements/{entitlement_id}/consume',
  operationId: 'consume_entitlement',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      entitlement_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'entitlement_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for consume_entitlement',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
})

export const getApplicationsApplicationIdGuildsGuildIdCommandsRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/guilds/{guild_id}/commands',
  operationId: 'list_guild_application_commands',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      with_localizations: z
        .stringbool()
        .exactOptional()
        .openapi({
          param: { name: 'with_localizations', in: 'query', schema: { type: 'boolean' } },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_application_commands',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': { schema: z.array(ApplicationCommandResponseSchema).nullable() },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const putApplicationsApplicationIdGuildsGuildIdCommandsRoute = createRoute({
  method: 'put',
  path: '/applications/{application_id}/guilds/{guild_id}/commands',
  operationId: 'bulk_set_guild_application_commands',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.array(ApplicationCommandUpdateRequestSchema).max(110).nullable(),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for bulk_set_guild_application_commands',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': { schema: z.array(ApplicationCommandResponseSchema).nullable() },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const postApplicationsApplicationIdGuildsGuildIdCommandsRoute = createRoute({
  method: 'post',
  path: '/applications/{application_id}/guilds/{guild_id}/commands',
  operationId: 'create_guild_application_command',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: ApplicationCommandCreateRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_guild_application_command',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ApplicationCommandResponseSchema } },
    },
    201: {
      description: '201 response for create_guild_application_command',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ApplicationCommandResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/guilds/{guild_id}/commands/permissions',
  operationId: 'list_guild_application_command_permissions',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_application_command_permissions',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(CommandPermissionsResponseSchema) } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
})

export const getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
  operationId: 'get_guild_application_command',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      command_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'command_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_application_command',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ApplicationCommandResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdRoute = createRoute({
  method: 'delete',
  path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
  operationId: 'delete_guild_application_command',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      command_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'command_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_guild_application_command',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const patchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdRoute = createRoute({
  method: 'patch',
  path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
  operationId: 'update_guild_application_command',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      command_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'command_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: ApplicationCommandPatchRequestPartialSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild_application_command',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ApplicationCommandResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
})

export const getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsRoute =
  createRoute({
    method: 'get',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    operationId: 'get_guild_application_command_permissions',
    request: {
      params: z.object({
        application_id: SnowflakeTypeSchema.openapi({
          param: {
            name: 'application_id',
            in: 'path',
            schema: { $ref: '#/components/schemas/SnowflakeType' },
            required: true,
          },
        }),
        guild_id: SnowflakeTypeSchema.openapi({
          param: {
            name: 'guild_id',
            in: 'path',
            schema: { $ref: '#/components/schemas/SnowflakeType' },
            required: true,
          },
        }),
        command_id: SnowflakeTypeSchema.openapi({
          param: {
            name: 'command_id',
            in: 'path',
            schema: { $ref: '#/components/schemas/SnowflakeType' },
            required: true,
          },
        }),
      }),
    },
    responses: {
      200: {
        description: '200 response for get_guild_application_command_permissions',
        headers: z.object({
          'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
          'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
          'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
          'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
          'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
        }),
        content: { 'application/json': { schema: CommandPermissionsResponseSchema } },
      },
      429: ClientRatelimitedResponse,
      '4XX': ClientErrorResponse,
    },
    security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
  })

export const putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsRoute =
  createRoute({
    method: 'put',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    operationId: 'set_guild_application_command_permissions',
    request: {
      params: z.object({
        application_id: SnowflakeTypeSchema.openapi({
          param: {
            name: 'application_id',
            in: 'path',
            schema: { $ref: '#/components/schemas/SnowflakeType' },
            required: true,
          },
        }),
        guild_id: SnowflakeTypeSchema.openapi({
          param: {
            name: 'guild_id',
            in: 'path',
            schema: { $ref: '#/components/schemas/SnowflakeType' },
            required: true,
          },
        }),
        command_id: SnowflakeTypeSchema.openapi({
          param: {
            name: 'command_id',
            in: 'path',
            schema: { $ref: '#/components/schemas/SnowflakeType' },
            required: true,
          },
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: z.object({
              permissions: z
                .array(ApplicationCommandPermissionSchema)
                .max(100)
                .nullable()
                .exactOptional(),
            }),
          },
        },
        required: true,
      },
    },
    responses: {
      200: {
        description: '200 response for set_guild_application_command_permissions',
        headers: z.object({
          'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
          'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
          'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
          'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
          'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
        }),
        content: { 'application/json': { schema: CommandPermissionsResponseSchema } },
      },
      429: ClientRatelimitedResponse,
      '4XX': ClientErrorResponse,
    },
    security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
  })

export const getApplicationsApplicationIdRoleConnectionsMetadataRoute = createRoute({
  method: 'get',
  path: '/applications/{application_id}/role-connections/metadata',
  operationId: 'get_application_role_connections_metadata',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_application_role_connections_metadata',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.array(ApplicationRoleConnectionsMetadataItemResponseSchema).nullable(),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putApplicationsApplicationIdRoleConnectionsMetadataRoute = createRoute({
  method: 'put',
  path: '/applications/{application_id}/role-connections/metadata',
  operationId: 'update_application_role_connections_metadata',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.array(ApplicationRoleConnectionsMetadataItemRequestSchema).max(5).nullable(),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_application_role_connections_metadata',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.array(ApplicationRoleConnectionsMetadataItemResponseSchema).nullable(),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}',
  operationId: 'get_channel',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_channel',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            GuildChannelResponseSchema,
            PrivateChannelResponseSchema,
            PrivateGroupChannelResponseSchema,
            ThreadResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}',
  operationId: 'delete_channel',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for delete_channel',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            GuildChannelResponseSchema,
            PrivateChannelResponseSchema,
            PrivateGroupChannelResponseSchema,
            ThreadResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchChannelsChannelIdRoute = createRoute({
  method: 'patch',
  path: '/channels/{channel_id}',
  operationId: 'update_channel',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .union([
              UpdateDMRequestPartialSchema,
              UpdateGroupDMRequestPartialSchema,
              UpdateGuildChannelRequestPartialSchema,
              UpdateThreadRequestPartialSchema,
            ])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_channel',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            GuildChannelResponseSchema,
            PrivateChannelResponseSchema,
            PrivateGroupChannelResponseSchema,
            ThreadResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdFollowersRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/followers',
  operationId: 'follow_channel',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ webhook_channel_id: SnowflakeTypeSchema })
            .openapi({ required: ['webhook_channel_id'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for follow_channel',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ChannelFollowerResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdInvitesRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/invites',
  operationId: 'list_channel_invites',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_channel_invites',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z
            .array(
              z.xor([
                FriendInviteResponseSchema,
                GroupDMInviteResponseSchema,
                GuildInviteResponseSchema,
                z.null().nullable(),
              ]),
            )
            .nullable(),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdInvitesRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/invites',
  operationId: 'create_channel_invite',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .union([CreateGroupDMInviteRequestSchema, CreateGuildInviteRequestSchema])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
        'application/x-www-form-urlencoded': {
          schema: z
            .union([CreateGroupDMInviteRequestSchema, CreateGuildInviteRequestSchema])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
        'multipart/form-data': {
          schema: z
            .union([CreateGroupDMInviteRequestSchema, CreateGuildInviteRequestSchema])
            .openapi({ 'x-discord-union': 'oneOf' })
            .and(z.object({ target_users_file: z.string().exactOptional() })),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_channel_invite',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
          ]),
        },
      },
    },
    204: {
      description: '204 response for create_channel_invite',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdMessagesRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/messages',
  operationId: 'list_messages',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      around: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'around',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      before: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'before',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      after: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'after',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      limit: z
        .int()
        .min(1)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 100 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_messages',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(MessageResponseSchema).nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdMessagesRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/messages',
  operationId: 'create_message',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': { schema: MessageCreateRequestSchema },
        'application/x-www-form-urlencoded': { schema: MessageCreateRequestSchema },
        'multipart/form-data': {
          schema: MessageCreateRequestSchema.and(
            z.object({
              'files[0]': z.string().exactOptional(),
              'files[1]': z.string().exactOptional(),
              'files[2]': z.string().exactOptional(),
              'files[3]': z.string().exactOptional(),
              'files[4]': z.string().exactOptional(),
              'files[5]': z.string().exactOptional(),
              'files[6]': z.string().exactOptional(),
              'files[7]': z.string().exactOptional(),
              'files[8]': z.string().exactOptional(),
              'files[9]': z.string().exactOptional(),
            }),
          ),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdMessagesBulkDeleteRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/messages/bulk-delete',
  operationId: 'bulk_delete_messages',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ messages: z.array(SnowflakeTypeSchema).min(2).max(100) })
            .openapi({ required: ['messages'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    204: {
      description: '204 response for bulk_delete_messages',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdMessagesPinsRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/messages/pins',
  operationId: 'list_pins',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      before: z.iso
        .datetime()
        .exactOptional()
        .openapi({
          param: { name: 'before', in: 'query', schema: { type: 'string', format: 'date-time' } },
        }),
      limit: z
        .int()
        .min(1)
        .max(50)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 50 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_pins',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: PinnedMessagesResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putChannelsChannelIdMessagesPinsMessageIdRoute = createRoute({
  method: 'put',
  path: '/channels/{channel_id}/messages/pins/{message_id}',
  operationId: 'create_pin',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for create_pin',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdMessagesPinsMessageIdRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/messages/pins/{message_id}',
  operationId: 'delete_pin',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_pin',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdMessagesMessageIdRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/messages/{message_id}',
  operationId: 'get_message',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdMessagesMessageIdRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/messages/{message_id}',
  operationId: 'delete_message',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchChannelsChannelIdMessagesMessageIdRoute = createRoute({
  method: 'patch',
  path: '/channels/{channel_id}/messages/{message_id}',
  operationId: 'update_message',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': { schema: MessageEditRequestPartialSchema },
        'application/x-www-form-urlencoded': { schema: MessageEditRequestPartialSchema },
        'multipart/form-data': {
          schema: MessageEditRequestPartialSchema.and(
            z.object({
              'files[0]': z.string().exactOptional(),
              'files[1]': z.string().exactOptional(),
              'files[2]': z.string().exactOptional(),
              'files[3]': z.string().exactOptional(),
              'files[4]': z.string().exactOptional(),
              'files[5]': z.string().exactOptional(),
              'files[6]': z.string().exactOptional(),
              'files[7]': z.string().exactOptional(),
              'files[8]': z.string().exactOptional(),
              'files[9]': z.string().exactOptional(),
            }),
          ),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdMessagesMessageIdCrosspostRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/messages/{message_id}/crosspost',
  operationId: 'crosspost_message',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for crosspost_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdMessagesMessageIdReactionsRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/messages/{message_id}/reactions',
  operationId: 'delete_all_message_reactions',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_all_message_reactions',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdMessagesMessageIdReactionsEmojiNameRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
  operationId: 'list_message_reactions_by_emoji',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_name: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'emoji_name',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    query: z.object({
      after: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'after',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      limit: z
        .int()
        .min(1)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 100 },
          },
        }),
      type: ReactionTypesSchema.exactOptional().openapi({
        param: {
          name: 'type',
          in: 'query',
          schema: { $ref: '#/components/schemas/ReactionTypes' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_message_reactions_by_emoji',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(UserResponseSchema) } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
  operationId: 'delete_all_message_reactions_by_emoji',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_name: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'emoji_name',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_all_message_reactions_by_emoji',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeRoute = createRoute({
  method: 'put',
  path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
  operationId: 'add_my_message_reaction',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_name: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'emoji_name',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    204: {
      description: '204 response for add_my_message_reaction',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
  operationId: 'delete_my_message_reaction',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_name: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'emoji_name',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_my_message_reaction',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}',
  operationId: 'delete_user_message_reaction',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_name: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'emoji_name',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_user_message_reaction',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdMessagesMessageIdThreadsRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/messages/{message_id}/threads',
  operationId: 'create_thread_from_message',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: CreateTextThreadWithMessageRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for create_thread_from_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ThreadResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putChannelsChannelIdPermissionsOverwriteIdRoute = createRoute({
  method: 'put',
  path: '/channels/{channel_id}/permissions/{overwrite_id}',
  operationId: 'set_channel_permission_overwrite',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      overwrite_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'overwrite_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            type: z.xor([z.null().nullable(), ChannelPermissionOverwritesSchema]).exactOptional(),
            allow: z.int().nullable().exactOptional(),
            deny: z.int().nullable().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    204: {
      description: '204 response for set_channel_permission_overwrite',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdPermissionsOverwriteIdRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/permissions/{overwrite_id}',
  operationId: 'delete_channel_permission_overwrite',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      overwrite_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'overwrite_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_channel_permission_overwrite',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdPinsRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/pins',
  operationId: 'deprecated_list_pins',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for deprecated_list_pins',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(MessageResponseSchema).nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putChannelsChannelIdPinsMessageIdRoute = createRoute({
  method: 'put',
  path: '/channels/{channel_id}/pins/{message_id}',
  operationId: 'deprecated_create_pin',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for deprecated_create_pin',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdPinsMessageIdRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/pins/{message_id}',
  operationId: 'deprecated_delete_pin',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for deprecated_delete_pin',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdPollsMessageIdAnswersAnswerIdRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/polls/{message_id}/answers/{answer_id}',
  operationId: 'get_answer_voters',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      answer_id: z
        .int32()
        .min(1)
        .max(10)
        .openapi({
          param: {
            name: 'answer_id',
            in: 'path',
            schema: { type: 'integer', minimum: 1, maximum: 10, format: 'int32' },
            required: true,
          },
        }),
    }),
    query: z.object({
      after: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'after',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      limit: z
        .int()
        .min(1)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 100 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_answer_voters',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: PollAnswerDetailsResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdPollsMessageIdExpireRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/polls/{message_id}/expire',
  operationId: 'poll_expire',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for poll_expire',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putChannelsChannelIdRecipientsUserIdRoute = createRoute({
  method: 'put',
  path: '/channels/{channel_id}/recipients/{user_id}',
  operationId: 'add_group_dm_user',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            access_token: z.string().max(152133).nullable().exactOptional(),
            nick: z.string().max(152133).nullable().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for add_group_dm_user',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]),
        },
      },
    },
    204: {
      description: '204 response for add_group_dm_user',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdRecipientsUserIdRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/recipients/{user_id}',
  operationId: 'delete_group_dm_user',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_group_dm_user',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdSendSoundboardSoundRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/send-soundboard-sound',
  operationId: 'send_soundboard_sound',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: SoundboardSoundSendRequestSchema } },
      required: true,
    },
  },
  responses: {
    204: {
      description: '204 response for send_soundboard_sound',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdThreadMembersRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/thread-members',
  operationId: 'list_thread_members',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      with_member: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_member', in: 'query', schema: { type: 'boolean' } } }),
      limit: z
        .int()
        .min(1)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 100 },
          },
        }),
      after: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'after',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_thread_members',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(ThreadMemberResponseSchema) } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putChannelsChannelIdThreadMembersMeRoute = createRoute({
  method: 'put',
  path: '/channels/{channel_id}/thread-members/@me',
  operationId: 'join_thread',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for join_thread',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdThreadMembersMeRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/thread-members/@me',
  operationId: 'leave_thread',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for leave_thread',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdThreadMembersUserIdRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/thread-members/{user_id}',
  operationId: 'get_thread_member',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      with_member: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_member', in: 'query', schema: { type: 'boolean' } } }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_thread_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ThreadMemberResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putChannelsChannelIdThreadMembersUserIdRoute = createRoute({
  method: 'put',
  path: '/channels/{channel_id}/thread-members/{user_id}',
  operationId: 'add_thread_member',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for add_thread_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteChannelsChannelIdThreadMembersUserIdRoute = createRoute({
  method: 'delete',
  path: '/channels/{channel_id}/thread-members/{user_id}',
  operationId: 'delete_thread_member',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_thread_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdThreadsRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/threads',
  operationId: 'create_thread',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .union([CreateForumThreadRequestSchema, CreateTextThreadWithoutMessageRequestSchema])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
        'application/x-www-form-urlencoded': {
          schema: z
            .union([CreateForumThreadRequestSchema, CreateTextThreadWithoutMessageRequestSchema])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
        'multipart/form-data': {
          schema: z
            .union([CreateForumThreadRequestSchema, CreateTextThreadWithoutMessageRequestSchema])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for create_thread',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: CreatedThreadResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdThreadsArchivedPrivateRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/threads/archived/private',
  operationId: 'list_private_archived_threads',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      before: z.iso
        .datetime()
        .exactOptional()
        .openapi({
          param: { name: 'before', in: 'query', schema: { type: 'string', format: 'date-time' } },
        }),
      limit: z
        .int()
        .min(2)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 2, maximum: 100 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_private_archived_threads',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ThreadsResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdThreadsArchivedPublicRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/threads/archived/public',
  operationId: 'list_public_archived_threads',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      before: z.iso
        .datetime()
        .exactOptional()
        .openapi({
          param: { name: 'before', in: 'query', schema: { type: 'string', format: 'date-time' } },
        }),
      limit: z
        .int()
        .min(2)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 2, maximum: 100 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_public_archived_threads',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ThreadsResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdThreadsSearchRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/threads/search',
  operationId: 'thread_search',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      name: z
        .string()
        .max(100)
        .exactOptional()
        .openapi({
          param: { name: 'name', in: 'query', schema: { type: 'string', maxLength: 100 } },
        }),
      slop: z
        .int()
        .min(0)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'slop',
            in: 'query',
            schema: { type: 'integer', minimum: 0, maximum: 100 },
          },
        }),
      min_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'min_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      max_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'max_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      tag: z
        .xor([
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'tag',
                in: 'query',
                schema: {
                  oneOf: [
                    { type: 'string' },
                    {
                      type: 'array',
                      items: { $ref: '#/components/schemas/SnowflakeType' },
                      maxItems: 20,
                      uniqueItems: true,
                    },
                  ],
                },
              },
            }),
          z
            .array(SnowflakeTypeSchema)
            .max(20)
            .exactOptional()
            .openapi({
              param: {
                name: 'tag',
                in: 'query',
                schema: {
                  oneOf: [
                    { type: 'string' },
                    {
                      type: 'array',
                      items: { $ref: '#/components/schemas/SnowflakeType' },
                      maxItems: 20,
                      uniqueItems: true,
                    },
                  ],
                },
              },
            }),
        ])
        .exactOptional()
        .openapi({
          param: {
            name: 'tag',
            in: 'query',
            schema: {
              oneOf: [
                { type: 'string' },
                {
                  type: 'array',
                  items: { $ref: '#/components/schemas/SnowflakeType' },
                  maxItems: 20,
                  uniqueItems: true,
                },
              ],
            },
          },
        }),
      tag_setting: ThreadSearchTagSettingSchema.exactOptional().openapi({
        param: {
          name: 'tag_setting',
          in: 'query',
          schema: { $ref: '#/components/schemas/ThreadSearchTagSetting' },
        },
      }),
      archived: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'archived', in: 'query', schema: { type: 'boolean' } } }),
      sort_by: ThreadSortingModeSchema.exactOptional().openapi({
        param: {
          name: 'sort_by',
          in: 'query',
          schema: { $ref: '#/components/schemas/ThreadSortingMode' },
        },
      }),
      sort_order: SortingOrderSchema.exactOptional().openapi({
        param: {
          name: 'sort_order',
          in: 'query',
          schema: { $ref: '#/components/schemas/SortingOrder' },
        },
      }),
      limit: z
        .int()
        .min(1)
        .max(25)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 25 },
          },
        }),
      offset: z
        .int()
        .min(0)
        .max(9975)
        .exactOptional()
        .openapi({
          param: {
            name: 'offset',
            in: 'query',
            schema: { type: 'integer', minimum: 0, maximum: 9975 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for thread_search',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ThreadSearchResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdTypingRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/typing',
  operationId: 'trigger_typing_indicator',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for trigger_typing_indicator',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: TypingIndicatorResponseSchema } },
    },
    204: {
      description: '204 response for trigger_typing_indicator',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdUsersMeThreadsArchivedPrivateRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/users/@me/threads/archived/private',
  operationId: 'list_my_private_archived_threads',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      before: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'before',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      limit: z
        .int()
        .min(2)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 2, maximum: 100 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_my_private_archived_threads',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ThreadsResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getChannelsChannelIdWebhooksRoute = createRoute({
  method: 'get',
  path: '/channels/{channel_id}/webhooks',
  operationId: 'list_channel_webhooks',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_channel_webhooks',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z
            .array(
              z.xor([
                ApplicationIncomingWebhookResponseSchema,
                ChannelFollowerWebhookResponseSchema,
                GuildIncomingWebhookResponseSchema,
              ]),
            )
            .nullable(),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postChannelsChannelIdWebhooksRoute = createRoute({
  method: 'post',
  path: '/channels/{channel_id}/webhooks',
  operationId: 'create_webhook',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              name: z.string().min(1).max(80),
              avatar: z.string().nullable().exactOptional(),
            })
            .openapi({ required: ['name'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_webhook',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildIncomingWebhookResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGatewayRoute = createRoute({
  method: 'get',
  path: '/gateway',
  operationId: 'get_gateway',
  responses: {
    200: {
      description: '200 response for get_gateway',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GatewayResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const getGatewayBotRoute = createRoute({
  method: 'get',
  path: '/gateway/bot',
  operationId: 'get_bot_gateway',
  responses: {
    200: {
      description: '200 response for get_bot_gateway',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GatewayBotResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsTemplatesCodeRoute = createRoute({
  method: 'get',
  path: '/guilds/templates/{code}',
  operationId: 'get_guild_template',
  request: {
    params: z.object({
      code: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'code',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_template',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildTemplateResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const getGuildsGuildIdRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}',
  operationId: 'get_guild',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      with_counts: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_counts', in: 'query', schema: { type: 'boolean' } } }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildWithCountsResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}',
  operationId: 'update_guild',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: GuildPatchRequestPartialSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdAuditLogsRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/audit-logs',
  operationId: 'list_guild_audit_log_entries',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      user_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'user_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      target_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'target_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      action_type: AuditLogActionTypesSchema.exactOptional().openapi({
        param: {
          name: 'action_type',
          in: 'query',
          schema: { $ref: '#/components/schemas/AuditLogActionTypes' },
        },
      }),
      before: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'before',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      after: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'after',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      limit: z
        .int()
        .min(1)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 100 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_audit_log_entries',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildAuditLogResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdAutoModerationRulesRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/auto-moderation/rules',
  operationId: 'list_auto_moderation_rules',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_auto_moderation_rules',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z
            .array(
              z.xor([
                DefaultKeywordRuleResponseSchema,
                KeywordRuleResponseSchema,
                MLSpamRuleResponseSchema,
                MentionSpamRuleResponseSchema,
                SpamLinkRuleResponseSchema,
                z.null().nullable(),
              ]),
            )
            .nullable(),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postGuildsGuildIdAutoModerationRulesRoute = createRoute({
  method: 'post',
  path: '/guilds/{guild_id}/auto-moderation/rules',
  operationId: 'create_auto_moderation_rule',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.xor([
            DefaultKeywordListUpsertRequestSchema,
            KeywordUpsertRequestSchema,
            MLSpamUpsertRequestSchema,
            MentionSpamUpsertRequestSchema,
          ]),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_auto_moderation_rule',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            DefaultKeywordRuleResponseSchema,
            KeywordRuleResponseSchema,
            MLSpamRuleResponseSchema,
            MentionSpamRuleResponseSchema,
            SpamLinkRuleResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdAutoModerationRulesRuleIdRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
  operationId: 'get_auto_moderation_rule',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      rule_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'rule_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_auto_moderation_rule',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            DefaultKeywordRuleResponseSchema,
            KeywordRuleResponseSchema,
            MLSpamRuleResponseSchema,
            MentionSpamRuleResponseSchema,
            SpamLinkRuleResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdAutoModerationRulesRuleIdRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
  operationId: 'delete_auto_moderation_rule',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      rule_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'rule_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_auto_moderation_rule',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdAutoModerationRulesRuleIdRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
  operationId: 'update_auto_moderation_rule',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      rule_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'rule_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .union([
              DefaultKeywordListUpsertRequestPartialSchema,
              KeywordUpsertRequestPartialSchema,
              MLSpamUpsertRequestPartialSchema,
              MentionSpamUpsertRequestPartialSchema,
            ])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_auto_moderation_rule',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            DefaultKeywordRuleResponseSchema,
            KeywordRuleResponseSchema,
            MLSpamRuleResponseSchema,
            MentionSpamRuleResponseSchema,
            SpamLinkRuleResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdBansRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/bans',
  operationId: 'list_guild_bans',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      limit: z
        .int()
        .min(1)
        .max(1000)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 1000 },
          },
        }),
      before: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'before',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      after: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'after',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_bans',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(GuildBanResponseSchema).nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdBansUserIdRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/bans/{user_id}',
  operationId: 'get_guild_ban',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_ban',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildBanResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putGuildsGuildIdBansUserIdRoute = createRoute({
  method: 'put',
  path: '/guilds/{guild_id}/bans/{user_id}',
  operationId: 'ban_user_from_guild',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: BanUserFromGuildRequestSchema } },
      required: true,
    },
  },
  responses: {
    204: {
      description: '204 response for ban_user_from_guild',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdBansUserIdRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/bans/{user_id}',
  operationId: 'unban_user_from_guild',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: UnbanUserFromGuildRequestSchema } },
      required: true,
    },
  },
  responses: {
    204: {
      description: '204 response for unban_user_from_guild',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postGuildsGuildIdBulkBanRoute = createRoute({
  method: 'post',
  path: '/guilds/{guild_id}/bulk-ban',
  operationId: 'bulk_ban_users_from_guild',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: BulkBanUsersRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for bulk_ban_users_from_guild',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: BulkBanUsersResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdChannelsRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/channels',
  operationId: 'list_guild_channels',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_channels',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z
            .array(
              z.xor([
                GuildChannelResponseSchema,
                PrivateChannelResponseSchema,
                PrivateGroupChannelResponseSchema,
                ThreadResponseSchema,
              ]),
            )
            .nullable(),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: [] }],
})

export const postGuildsGuildIdChannelsRoute = createRoute({
  method: 'post',
  path: '/guilds/{guild_id}/channels',
  operationId: 'create_guild_channel',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: CreateGuildChannelRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for create_guild_channel',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildChannelResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdChannelsRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/channels',
  operationId: 'bulk_update_guild_channels',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
              position: z.int32().min(0).nullable().exactOptional(),
              parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
              lock_permissions: z.boolean().nullable().exactOptional(),
            }),
          ),
        },
      },
      required: true,
    },
  },
  responses: {
    204: {
      description: '204 response for bulk_update_guild_channels',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdEmojisRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/emojis',
  operationId: 'list_guild_emojis',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_emojis',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(EmojiResponseSchema).nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postGuildsGuildIdEmojisRoute = createRoute({
  method: 'post',
  path: '/guilds/{guild_id}/emojis',
  operationId: 'create_guild_emoji',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              name: z.string().min(2).max(32),
              image: z.string(),
              roles: z
                .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
                .max(1521)
                .nullable()
                .exactOptional(),
            })
            .openapi({ required: ['name', 'image'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for create_guild_emoji',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: EmojiResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdEmojisEmojiIdRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/emojis/{emoji_id}',
  operationId: 'get_guild_emoji',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'emoji_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_emoji',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: EmojiResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdEmojisEmojiIdRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/emojis/{emoji_id}',
  operationId: 'delete_guild_emoji',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'emoji_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_guild_emoji',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdEmojisEmojiIdRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/emojis/{emoji_id}',
  operationId: 'update_guild_emoji',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      emoji_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'emoji_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().min(2).max(32).exactOptional(),
            roles: z
              .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
              .max(1521)
              .nullable()
              .exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild_emoji',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: EmojiResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdIntegrationsRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/integrations',
  operationId: 'list_guild_integrations',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_integrations',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z
            .array(
              z.xor([
                DiscordIntegrationResponseSchema,
                ExternalConnectionIntegrationResponseSchema,
                GuildSubscriptionIntegrationResponseSchema,
              ]),
            )
            .nullable(),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdIntegrationsIntegrationIdRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/integrations/{integration_id}',
  operationId: 'delete_guild_integration',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      integration_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'integration_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_guild_integration',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdInvitesRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/invites',
  operationId: 'list_guild_invites',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_invites',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z
            .array(
              z.xor([
                FriendInviteResponseSchema,
                GroupDMInviteResponseSchema,
                GuildInviteResponseSchema,
                z.null().nullable(),
              ]),
            )
            .nullable(),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdMembersRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/members',
  operationId: 'list_guild_members',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      limit: z
        .int()
        .min(1)
        .max(1000)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 1000 },
          },
        }),
      after: z
        .int()
        .min(0)
        .exactOptional()
        .openapi({
          param: { name: 'after', in: 'query', schema: { type: 'integer', minimum: 0 } },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_members',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(GuildMemberResponseSchema) } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdMembersMeRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/members/@me',
  operationId: 'update_my_guild_member',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({ nick: z.string().max(32).nullable().exactOptional() }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_my_guild_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: PrivateGuildMemberResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdMembersSearchRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/members/search',
  operationId: 'search_guild_members',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      limit: z
        .int()
        .min(1)
        .max(1000)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 1000 },
          },
        }),
      query: z
        .string()
        .min(1)
        .max(100)
        .openapi({
          param: {
            name: 'query',
            in: 'query',
            schema: { type: 'string', minLength: 1, maxLength: 100 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for search_guild_members',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(GuildMemberResponseSchema) } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdMembersUserIdRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/members/{user_id}',
  operationId: 'get_guild_member',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildMemberResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putGuildsGuildIdMembersUserIdRoute = createRoute({
  method: 'put',
  path: '/guilds/{guild_id}/members/{user_id}',
  operationId: 'add_guild_member',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: BotAddGuildMemberRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for add_guild_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildMemberResponseSchema } },
    },
    204: {
      description: '204 response for add_guild_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdMembersUserIdRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/members/{user_id}',
  operationId: 'delete_guild_member',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_guild_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdMembersUserIdRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/members/{user_id}',
  operationId: 'update_guild_member',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            nick: z.string().max(32).nullable().exactOptional(),
            roles: z
              .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
              .max(350)
              .nullable()
              .exactOptional(),
            mute: z.boolean().nullable().exactOptional(),
            deaf: z.boolean().nullable().exactOptional(),
            channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
            communication_disabled_until: z.iso.datetime().nullable().exactOptional(),
            flags: z.int().nullable().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildMemberResponseSchema } },
    },
    204: {
      description: '204 response for update_guild_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putGuildsGuildIdMembersUserIdRolesRoleIdRoute = createRoute({
  method: 'put',
  path: '/guilds/{guild_id}/members/{user_id}/roles/{role_id}',
  operationId: 'add_guild_member_role',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      role_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'role_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for add_guild_member_role',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdMembersUserIdRolesRoleIdRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/members/{user_id}/roles/{role_id}',
  operationId: 'delete_guild_member_role',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      role_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'role_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_guild_member_role',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdMessagesSearchRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/messages/search',
  operationId: 'guild_search',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      sort_by: SortingModeSchema.exactOptional().openapi({
        param: {
          name: 'sort_by',
          in: 'query',
          schema: { $ref: '#/components/schemas/SortingMode' },
        },
      }),
      sort_order: SortingOrderSchema.exactOptional().openapi({
        param: {
          name: 'sort_order',
          in: 'query',
          schema: { $ref: '#/components/schemas/SortingOrder' },
        },
      }),
      content: z
        .string()
        .max(1024)
        .exactOptional()
        .openapi({
          param: { name: 'content', in: 'query', schema: { type: 'string', maxLength: 1024 } },
        }),
      slop: z
        .int()
        .min(0)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'slop',
            in: 'query',
            schema: { type: 'integer', minimum: 0, maximum: 100 },
          },
        }),
      contents: z
        .array(
          z
            .string()
            .max(1024)
            .exactOptional()
            .openapi({
              param: {
                name: 'contents',
                in: 'query',
                schema: {
                  type: 'array',
                  items: { type: 'string', maxLength: 1024 },
                  maxItems: 100,
                },
              },
            }),
        )
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'contents',
            in: 'query',
            schema: { type: 'array', items: { type: 'string', maxLength: 1024 }, maxItems: 100 },
          },
        }),
      author_id: z
        .array(SnowflakeTypeSchema)
        .max(1521)
        .exactOptional()
        .openapi({
          param: {
            name: 'author_id',
            in: 'query',
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/SnowflakeType' },
              maxItems: 1521,
              uniqueItems: true,
            },
          },
        }),
      author_type: z
        .array(AuthorTypeSchema)
        .max(1521)
        .exactOptional()
        .openapi({
          param: {
            name: 'author_type',
            in: 'query',
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/AuthorType' },
              maxItems: 1521,
              uniqueItems: true,
            },
          },
        }),
      mentions: z
        .array(SnowflakeTypeSchema)
        .max(1521)
        .exactOptional()
        .openapi({
          param: {
            name: 'mentions',
            in: 'query',
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/SnowflakeType' },
              maxItems: 1521,
              uniqueItems: true,
            },
          },
        }),
      mention_everyone: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'mention_everyone', in: 'query', schema: { type: 'boolean' } } }),
      min_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'min_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      max_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'max_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      limit: z
        .int()
        .min(1)
        .max(25)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 25 },
          },
        }),
      offset: z
        .int()
        .min(0)
        .max(9975)
        .exactOptional()
        .openapi({
          param: {
            name: 'offset',
            in: 'query',
            schema: { type: 'integer', minimum: 0, maximum: 9975 },
          },
        }),
      cursor: z
        .xor([ScoreCursorSchema, TimestampCursorSchema])
        .exactOptional()
        .openapi({
          param: {
            name: 'cursor',
            in: 'query',
            schema: {
              oneOf: [
                { $ref: '#/components/schemas/ScoreCursor' },
                { $ref: '#/components/schemas/TimestampCursor' },
              ],
            },
          },
        }),
      has: z
        .array(HasOptionSchema)
        .max(1521)
        .exactOptional()
        .openapi({
          param: {
            name: 'has',
            in: 'query',
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/HasOption' },
              maxItems: 1521,
              uniqueItems: true,
            },
          },
        }),
      link_hostname: z
        .array(
          z
            .string()
            .max(152133)
            .exactOptional()
            .openapi({
              param: {
                name: 'link_hostname',
                in: 'query',
                schema: {
                  type: 'array',
                  items: { type: 'string', maxLength: 152133 },
                  maxItems: 1521,
                  uniqueItems: true,
                },
              },
            }),
        )
        .max(1521)
        .exactOptional()
        .openapi({
          param: {
            name: 'link_hostname',
            in: 'query',
            schema: {
              type: 'array',
              items: { type: 'string', maxLength: 152133 },
              maxItems: 1521,
              uniqueItems: true,
            },
          },
        }),
      embed_provider: z
        .array(
          z
            .string()
            .max(256)
            .exactOptional()
            .openapi({
              param: {
                name: 'embed_provider',
                in: 'query',
                schema: {
                  type: 'array',
                  items: { type: 'string', maxLength: 256 },
                  maxItems: 1521,
                  uniqueItems: true,
                },
              },
            }),
        )
        .max(1521)
        .exactOptional()
        .openapi({
          param: {
            name: 'embed_provider',
            in: 'query',
            schema: {
              type: 'array',
              items: { type: 'string', maxLength: 256 },
              maxItems: 1521,
              uniqueItems: true,
            },
          },
        }),
      embed_type: z
        .array(
          z
            .xor([
              z
                .null()
                .nullable()
                .exactOptional()
                .openapi({
                  param: {
                    name: 'embed_type',
                    in: 'query',
                    schema: {
                      type: 'array',
                      items: {
                        oneOf: [
                          { type: 'null' },
                          { $ref: '#/components/schemas/SearchableEmbedType' },
                        ],
                      },
                      maxItems: 1521,
                      uniqueItems: true,
                    },
                  },
                }),
              SearchableEmbedTypeSchema,
            ])
            .exactOptional()
            .openapi({
              param: {
                name: 'embed_type',
                in: 'query',
                schema: {
                  type: 'array',
                  items: {
                    oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SearchableEmbedType' }],
                  },
                  maxItems: 1521,
                  uniqueItems: true,
                },
              },
            }),
        )
        .max(1521)
        .exactOptional()
        .openapi({
          param: {
            name: 'embed_type',
            in: 'query',
            schema: {
              type: 'array',
              items: {
                oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SearchableEmbedType' }],
              },
              maxItems: 1521,
              uniqueItems: true,
            },
          },
        }),
      attachment_extension: z
        .array(
          z
            .string()
            .max(152133)
            .exactOptional()
            .openapi({
              param: {
                name: 'attachment_extension',
                in: 'query',
                schema: {
                  type: 'array',
                  items: { type: 'string', maxLength: 152133 },
                  maxItems: 1521,
                  uniqueItems: true,
                },
              },
            }),
        )
        .max(1521)
        .exactOptional()
        .openapi({
          param: {
            name: 'attachment_extension',
            in: 'query',
            schema: {
              type: 'array',
              items: { type: 'string', maxLength: 152133 },
              maxItems: 1521,
              uniqueItems: true,
            },
          },
        }),
      attachment_filename: z
        .array(
          z
            .string()
            .max(1024)
            .exactOptional()
            .openapi({
              param: {
                name: 'attachment_filename',
                in: 'query',
                schema: {
                  type: 'array',
                  items: { type: 'string', maxLength: 1024 },
                  maxItems: 1521,
                  uniqueItems: true,
                },
              },
            }),
        )
        .max(1521)
        .exactOptional()
        .openapi({
          param: {
            name: 'attachment_filename',
            in: 'query',
            schema: {
              type: 'array',
              items: { type: 'string', maxLength: 1024 },
              maxItems: 1521,
              uniqueItems: true,
            },
          },
        }),
      pinned: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'pinned', in: 'query', schema: { type: 'boolean' } } }),
      command_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'command_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      command_name: z
        .string()
        .max(32)
        .exactOptional()
        .openapi({
          param: { name: 'command_name', in: 'query', schema: { type: 'string', maxLength: 32 } },
        }),
      include_nsfw: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'include_nsfw', in: 'query', schema: { type: 'boolean' } } }),
      channel_id: z
        .array(SnowflakeTypeSchema)
        .max(500)
        .exactOptional()
        .openapi({
          param: {
            name: 'channel_id',
            in: 'query',
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/SnowflakeType' },
              maxItems: 500,
              uniqueItems: true,
            },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for guild_search',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildSearchResponseSchema } },
    },
    202: {
      description: '202 response for guild_search',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: SearchIndexNotReadyResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdNewMemberWelcomeRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/new-member-welcome',
  operationId: 'get_guild_new_member_welcome',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_new_member_welcome',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildHomeSettingsResponseSchema } },
    },
    204: {
      description: '204 response for get_guild_new_member_welcome',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdOnboardingRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/onboarding',
  operationId: 'get_guilds_onboarding',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guilds_onboarding',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: UserGuildOnboardingResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putGuildsGuildIdOnboardingRoute = createRoute({
  method: 'put',
  path: '/guilds/{guild_id}/onboarding',
  operationId: 'put_guilds_onboarding',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateGuildOnboardingRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for put_guilds_onboarding',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildOnboardingResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdPreviewRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/preview',
  operationId: 'get_guild_preview',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_preview',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildPreviewResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdPruneRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/prune',
  operationId: 'preview_prune_guild',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      days: z
        .int()
        .min(1)
        .max(30)
        .exactOptional()
        .openapi({
          param: {
            name: 'days',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 30 },
          },
        }),
      include_roles: z
        .xor([
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'include_roles',
                in: 'query',
                schema: {
                  oneOf: [
                    { type: 'string' },
                    {
                      type: 'array',
                      items: {
                        oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SnowflakeType' }],
                      },
                      maxItems: 100,
                      uniqueItems: true,
                    },
                  ],
                },
              },
            }),
          z
            .array(
              z
                .xor([
                  z
                    .null()
                    .nullable()
                    .exactOptional()
                    .openapi({
                      param: {
                        name: 'include_roles',
                        in: 'query',
                        schema: {
                          oneOf: [
                            { type: 'string' },
                            {
                              type: 'array',
                              items: {
                                oneOf: [
                                  { type: 'null' },
                                  { $ref: '#/components/schemas/SnowflakeType' },
                                ],
                              },
                              maxItems: 100,
                              uniqueItems: true,
                            },
                          ],
                        },
                      },
                    }),
                  SnowflakeTypeSchema,
                ])
                .exactOptional()
                .openapi({
                  param: {
                    name: 'include_roles',
                    in: 'query',
                    schema: {
                      oneOf: [
                        { type: 'string' },
                        {
                          type: 'array',
                          items: {
                            oneOf: [
                              { type: 'null' },
                              { $ref: '#/components/schemas/SnowflakeType' },
                            ],
                          },
                          maxItems: 100,
                          uniqueItems: true,
                        },
                      ],
                    },
                  },
                }),
            )
            .max(100)
            .exactOptional()
            .openapi({
              param: {
                name: 'include_roles',
                in: 'query',
                schema: {
                  oneOf: [
                    { type: 'string' },
                    {
                      type: 'array',
                      items: {
                        oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SnowflakeType' }],
                      },
                      maxItems: 100,
                      uniqueItems: true,
                    },
                  ],
                },
              },
            }),
        ])
        .exactOptional()
        .openapi({
          param: {
            name: 'include_roles',
            in: 'query',
            schema: {
              oneOf: [
                { type: 'string' },
                {
                  type: 'array',
                  items: {
                    oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SnowflakeType' }],
                  },
                  maxItems: 100,
                  uniqueItems: true,
                },
              ],
            },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for preview_prune_guild',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildPruneResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postGuildsGuildIdPruneRoute = createRoute({
  method: 'post',
  path: '/guilds/{guild_id}/prune',
  operationId: 'prune_guild',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: { content: { 'application/json': { schema: PruneGuildRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: '200 response for prune_guild',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildPruneResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdRegionsRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/regions',
  operationId: 'list_guild_voice_regions',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_voice_regions',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(VoiceRegionResponseSchema).nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdRolesRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/roles',
  operationId: 'list_guild_roles',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_roles',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(GuildRoleResponseSchema) } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postGuildsGuildIdRolesRoute = createRoute({
  method: 'post',
  path: '/guilds/{guild_id}/roles',
  operationId: 'create_guild_role',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: { content: { 'application/json': { schema: CreateRoleRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: '200 response for create_guild_role',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildRoleResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdRolesRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/roles',
  operationId: 'bulk_update_guild_roles',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: z.array(UpdateRolePositionsRequestSchema) } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for bulk_update_guild_roles',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(GuildRoleResponseSchema) } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdRolesMemberCountsRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/roles/member-counts',
  operationId: 'guild_role_member_counts',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for guild_role_member_counts',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.record(z.string(), z.int32()) } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdRolesRoleIdRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/roles/{role_id}',
  operationId: 'get_guild_role',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      role_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'role_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_role',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildRoleResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdRolesRoleIdRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/roles/{role_id}',
  operationId: 'delete_guild_role',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      role_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'role_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_guild_role',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdRolesRoleIdRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/roles/{role_id}',
  operationId: 'update_guild_role',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      role_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'role_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateRoleRequestPartialSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild_role',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildRoleResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdScheduledEventsRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/scheduled-events',
  operationId: 'list_guild_scheduled_events',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      with_user_count: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_user_count', in: 'query', schema: { type: 'boolean' } } }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_scheduled_events',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z
            .array(
              z.xor([
                ExternalScheduledEventResponseSchema,
                StageScheduledEventResponseSchema,
                VoiceScheduledEventResponseSchema,
              ]),
            )
            .nullable(),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postGuildsGuildIdScheduledEventsRoute = createRoute({
  method: 'post',
  path: '/guilds/{guild_id}/scheduled-events',
  operationId: 'create_guild_scheduled_event',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.xor([
            ExternalScheduledEventCreateRequestSchema,
            StageScheduledEventCreateRequestSchema,
            VoiceScheduledEventCreateRequestSchema,
          ]),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_guild_scheduled_event',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            ExternalScheduledEventResponseSchema,
            StageScheduledEventResponseSchema,
            VoiceScheduledEventResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
  operationId: 'get_guild_scheduled_event',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_scheduled_event_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_scheduled_event_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      with_user_count: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_user_count', in: 'query', schema: { type: 'boolean' } } }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_scheduled_event',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            ExternalScheduledEventResponseSchema,
            StageScheduledEventResponseSchema,
            VoiceScheduledEventResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
  operationId: 'delete_guild_scheduled_event',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_scheduled_event_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_scheduled_event_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_guild_scheduled_event',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdScheduledEventsGuildScheduledEventIdRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
  operationId: 'update_guild_scheduled_event',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_scheduled_event_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_scheduled_event_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .union([
              ExternalScheduledEventPatchRequestPartialSchema,
              StageScheduledEventPatchRequestPartialSchema,
              VoiceScheduledEventPatchRequestPartialSchema,
            ])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild_scheduled_event',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            ExternalScheduledEventResponseSchema,
            StageScheduledEventResponseSchema,
            VoiceScheduledEventResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users',
  operationId: 'list_guild_scheduled_event_users',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      guild_scheduled_event_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_scheduled_event_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      with_member: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_member', in: 'query', schema: { type: 'boolean' } } }),
      limit: z
        .int()
        .min(1)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 100 },
          },
        }),
      before: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'before',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      after: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'after',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_scheduled_event_users',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': { schema: z.array(ScheduledEventUserResponseSchema).nullable() },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdSoundboardSoundsRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/soundboard-sounds',
  operationId: 'list_guild_soundboard_sounds',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_soundboard_sounds',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ListGuildSoundboardSoundsResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postGuildsGuildIdSoundboardSoundsRoute = createRoute({
  method: 'post',
  path: '/guilds/{guild_id}/soundboard-sounds',
  operationId: 'create_guild_soundboard_sound',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: SoundboardCreateRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for create_guild_soundboard_sound',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: SoundboardSoundResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdSoundboardSoundsSoundIdRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
  operationId: 'get_guild_soundboard_sound',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      sound_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'sound_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_soundboard_sound',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: SoundboardSoundResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdSoundboardSoundsSoundIdRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
  operationId: 'delete_guild_soundboard_sound',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      sound_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'sound_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_guild_soundboard_sound',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdSoundboardSoundsSoundIdRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
  operationId: 'update_guild_soundboard_sound',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      sound_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'sound_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: SoundboardPatchRequestPartialSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild_soundboard_sound',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: SoundboardSoundResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdStickersRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/stickers',
  operationId: 'list_guild_stickers',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_stickers',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(GuildStickerResponseSchema) } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postGuildsGuildIdStickersRoute = createRoute({
  method: 'post',
  path: '/guilds/{guild_id}/stickers',
  operationId: 'create_guild_sticker',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({
              name: z.string().min(2).max(30),
              tags: z.string().min(1).max(200),
              description: z.string().max(100).nullable().exactOptional(),
              file: z.string(),
            })
            .openapi({ required: ['name', 'tags', 'file'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for create_guild_sticker',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildStickerResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdStickersStickerIdRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/stickers/{sticker_id}',
  operationId: 'get_guild_sticker',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      sticker_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'sticker_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_sticker',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildStickerResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdStickersStickerIdRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/stickers/{sticker_id}',
  operationId: 'delete_guild_sticker',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      sticker_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'sticker_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_guild_sticker',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdStickersStickerIdRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/stickers/{sticker_id}',
  operationId: 'update_guild_sticker',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      sticker_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'sticker_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().min(2).max(30).exactOptional(),
            tags: z.string().min(1).max(200).exactOptional(),
            description: z.string().max(100).nullable().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild_sticker',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildStickerResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdTemplatesRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/templates',
  operationId: 'list_guild_templates',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_guild_templates',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(GuildTemplateResponseSchema).nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postGuildsGuildIdTemplatesRoute = createRoute({
  method: 'post',
  path: '/guilds/{guild_id}/templates',
  operationId: 'create_guild_template',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              name: z.string().min(1).max(100),
              description: z.string().max(120).nullable().exactOptional(),
            })
            .openapi({ required: ['name'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_guild_template',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildTemplateResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putGuildsGuildIdTemplatesCodeRoute = createRoute({
  method: 'put',
  path: '/guilds/{guild_id}/templates/{code}',
  operationId: 'sync_guild_template',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      code: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'code',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for sync_guild_template',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildTemplateResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteGuildsGuildIdTemplatesCodeRoute = createRoute({
  method: 'delete',
  path: '/guilds/{guild_id}/templates/{code}',
  operationId: 'delete_guild_template',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      code: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'code',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for delete_guild_template',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildTemplateResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdTemplatesCodeRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/templates/{code}',
  operationId: 'update_guild_template',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      code: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'code',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().min(1).max(100).exactOptional(),
            description: z.string().max(120).nullable().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild_template',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildTemplateResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdThreadsActiveRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/threads/active',
  operationId: 'get_active_guild_threads',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_active_guild_threads',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ThreadsResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdVanityUrlRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/vanity-url',
  operationId: 'get_guild_vanity_url',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_vanity_url',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: VanityURLResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdVoiceStatesMeRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/voice-states/@me',
  operationId: 'get_self_voice_state',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_self_voice_state',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: VoiceStateResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdVoiceStatesMeRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/voice-states/@me',
  operationId: 'update_self_voice_state',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateSelfVoiceStateRequestPartialSchema } },
      required: true,
    },
  },
  responses: {
    204: {
      description: '204 response for update_self_voice_state',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdVoiceStatesUserIdRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/voice-states/{user_id}',
  operationId: 'get_voice_state',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_voice_state',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: VoiceStateResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdVoiceStatesUserIdRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/voice-states/{user_id}',
  operationId: 'update_voice_state',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateVoiceStateRequestPartialSchema } },
      required: true,
    },
  },
  responses: {
    204: {
      description: '204 response for update_voice_state',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdWebhooksRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/webhooks',
  operationId: 'get_guild_webhooks',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_webhooks',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z
            .array(
              z.xor([
                ApplicationIncomingWebhookResponseSchema,
                ChannelFollowerWebhookResponseSchema,
                GuildIncomingWebhookResponseSchema,
              ]),
            )
            .nullable(),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdWelcomeScreenRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/welcome-screen',
  operationId: 'get_guild_welcome_screen',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_welcome_screen',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildWelcomeScreenResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdWelcomeScreenRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/welcome-screen',
  operationId: 'update_guild_welcome_screen',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: WelcomeScreenPatchRequestPartialSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild_welcome_screen',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: GuildWelcomeScreenResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdWidgetRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/widget',
  operationId: 'get_guild_widget_settings',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_widget_settings',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: WidgetSettingsResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchGuildsGuildIdWidgetRoute = createRoute({
  method: 'patch',
  path: '/guilds/{guild_id}/widget',
  operationId: 'update_guild_widget_settings',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
            enabled: z.boolean().nullable().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_guild_widget_settings',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: WidgetSettingsResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getGuildsGuildIdWidgetJsonRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/widget.json',
  operationId: 'get_guild_widget',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_widget',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: WidgetResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const getGuildsGuildIdWidgetPngRoute = createRoute({
  method: 'get',
  path: '/guilds/{guild_id}/widget.png',
  operationId: 'get_guild_widget_png',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      style: WidgetImageStylesSchema.exactOptional().openapi({
        param: {
          name: 'style',
          in: 'query',
          schema: { $ref: '#/components/schemas/WidgetImageStyles' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_guild_widget_png',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'image/png': { schema: z.string() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const postInteractionsInteractionIdInteractionTokenCallbackRoute = createRoute({
  method: 'post',
  path: '/interactions/{interaction_id}/{interaction_token}/callback',
  operationId: 'create_interaction_response',
  request: {
    params: z.object({
      interaction_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'interaction_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      interaction_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'interaction_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    query: z.object({
      with_response: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_response', in: 'query', schema: { type: 'boolean' } } }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .union([
              ApplicationCommandAutocompleteCallbackRequestSchema,
              CreateMessageInteractionCallbackRequestSchema,
              LaunchActivityInteractionCallbackRequestSchema,
              ModalInteractionCallbackRequestSchema,
              PongInteractionCallbackRequestSchema,
              UpdateMessageInteractionCallbackRequestSchema,
            ])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
        'application/x-www-form-urlencoded': {
          schema: z
            .union([
              ApplicationCommandAutocompleteCallbackRequestSchema,
              CreateMessageInteractionCallbackRequestSchema,
              LaunchActivityInteractionCallbackRequestSchema,
              ModalInteractionCallbackRequestSchema,
              PongInteractionCallbackRequestSchema,
              UpdateMessageInteractionCallbackRequestSchema,
            ])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
        'multipart/form-data': {
          schema: z
            .union([
              ApplicationCommandAutocompleteCallbackRequestSchema,
              CreateMessageInteractionCallbackRequestSchema,
              LaunchActivityInteractionCallbackRequestSchema,
              ModalInteractionCallbackRequestSchema,
              PongInteractionCallbackRequestSchema,
              UpdateMessageInteractionCallbackRequestSchema,
            ])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_interaction_response',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: InteractionCallbackResponseSchema } },
    },
    204: {
      description: '204 response for create_interaction_response',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const getInvitesCodeRoute = createRoute({
  method: 'get',
  path: '/invites/{code}',
  operationId: 'invite_resolve',
  request: {
    params: z.object({
      code: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'code',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    query: z.object({
      with_counts: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_counts', in: 'query', schema: { type: 'boolean' } } }),
      guild_scheduled_event_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'guild_scheduled_event_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for invite_resolve',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const deleteInvitesCodeRoute = createRoute({
  method: 'delete',
  path: '/invites/{code}',
  operationId: 'invite_revoke',
  request: {
    params: z.object({
      code: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'code',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for invite_revoke',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putLobbiesRoute = createRoute({
  method: 'put',
  path: '/lobbies',
  operationId: 'create_or_join_lobby',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
              lobby_metadata: z
                .record(z.string(), z.string().max(1024))
                .nullable()
                .exactOptional()
                .openapi({ maxProperties: 25 }),
              member_metadata: z
                .record(z.string(), z.string().max(1024))
                .nullable()
                .exactOptional()
                .openapi({ maxProperties: 25 }),
              secret: z.string().max(250),
              flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
            })
            .openapi({ required: ['secret'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_or_join_lobby',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: LobbyResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: [] }],
})

export const postLobbiesRoute = createRoute({
  method: 'post',
  path: '/lobbies',
  operationId: 'create_lobby',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
            members: z.array(LobbyMemberRequestSchema).max(25).nullable().exactOptional(),
            metadata: z
              .record(z.string(), z.string().max(1024))
              .nullable()
              .exactOptional()
              .openapi({ maxProperties: 25 }),
            flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
            override_event_webhooks_url: z.url().max(512).nullable().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for create_lobby',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: LobbyResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getLobbiesLobbyIdRoute = createRoute({
  method: 'get',
  path: '/lobbies/{lobby_id}',
  operationId: 'get_lobby',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_lobby',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: LobbyResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchLobbiesLobbyIdRoute = createRoute({
  method: 'patch',
  path: '/lobbies/{lobby_id}',
  operationId: 'edit_lobby',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
            metadata: z
              .record(z.string(), z.string().max(1024))
              .nullable()
              .exactOptional()
              .openapi({ maxProperties: 25 }),
            members: z.array(LobbyMemberRequestSchema).max(25).nullable().exactOptional(),
            flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
            override_event_webhooks_url: z.url().max(512).nullable().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for edit_lobby',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: LobbyResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchLobbiesLobbyIdChannelLinkingRoute = createRoute({
  method: 'patch',
  path: '/lobbies/{lobby_id}/channel-linking',
  operationId: 'edit_lobby_channel_link',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for edit_lobby_channel_link',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: LobbyResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: [] }],
})

export const deleteLobbiesLobbyIdMembersMeRoute = createRoute({
  method: 'delete',
  path: '/lobbies/{lobby_id}/members/@me',
  operationId: 'leave_lobby',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for leave_lobby',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: [] }],
})

export const postLobbiesLobbyIdMembersMeInvitesRoute = createRoute({
  method: 'post',
  path: '/lobbies/{lobby_id}/members/@me/invites',
  operationId: 'create_linked_lobby_guild_invite_for_self',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for create_linked_lobby_guild_invite_for_self',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: LobbyGuildInviteResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: [] }],
})

export const postLobbiesLobbyIdMembersBulkRoute = createRoute({
  method: 'post',
  path: '/lobbies/{lobby_id}/members/bulk',
  operationId: 'bulk_update_lobby_members',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.array(BulkLobbyMemberRequestSchema).min(1).max(25).nullable(),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for bulk_update_lobby_members',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(LobbyMemberResponseSchema).nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const putLobbiesLobbyIdMembersUserIdRoute = createRoute({
  method: 'put',
  path: '/lobbies/{lobby_id}/members/{user_id}',
  operationId: 'add_lobby_member',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            metadata: z
              .record(z.string(), z.string().max(1024))
              .nullable()
              .exactOptional()
              .openapi({ maxProperties: 25 }),
            flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for add_lobby_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: LobbyMemberResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteLobbiesLobbyIdMembersUserIdRoute = createRoute({
  method: 'delete',
  path: '/lobbies/{lobby_id}/members/{user_id}',
  operationId: 'delete_lobby_member',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_lobby_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postLobbiesLobbyIdMembersUserIdInvitesRoute = createRoute({
  method: 'post',
  path: '/lobbies/{lobby_id}/members/{user_id}/invites',
  operationId: 'create_linked_lobby_guild_invite_for_user',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for create_linked_lobby_guild_invite_for_user',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: LobbyGuildInviteResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getLobbiesLobbyIdMessagesRoute = createRoute({
  method: 'get',
  path: '/lobbies/{lobby_id}/messages',
  operationId: 'get_lobby_messages',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      limit: z
        .int()
        .min(1)
        .max(200)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 200 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_lobby_messages',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(LobbyMessageResponseSchema).nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: [] }],
})

export const postLobbiesLobbyIdMessagesRoute = createRoute({
  method: 'post',
  path: '/lobbies/{lobby_id}/messages',
  operationId: 'create_lobby_message',
  request: {
    params: z.object({
      lobby_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'lobby_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': { schema: SDKMessageRequestSchema },
        'application/x-www-form-urlencoded': { schema: SDKMessageRequestSchema },
        'multipart/form-data': { schema: SDKMessageRequestSchema },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '201 response for create_lobby_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: LobbyMessageResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: [] }],
})

export const getOauth2MeRoute = createRoute({
  method: 'get',
  path: '/oauth2/@me',
  operationId: 'get_my_oauth2_authorization',
  responses: {
    200: {
      description: '200 response for get_my_oauth2_authorization',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: OAuth2GetAuthorizationResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [
    { BotToken: [] },
    {
      OAuth2: [
        'activities.invites.write',
        'activities.read',
        'activities.write',
        'applications.builds.read',
        'applications.builds.upload',
        'applications.commands',
        'applications.commands.permissions.update',
        'applications.commands.update',
        'applications.entitlements',
        'applications.store.update',
        'bot',
        'connections',
        'dm_channels.read',
        'email',
        'gdm.join',
        'guilds',
        'guilds.join',
        'guilds.members.read',
        'identify',
        'messages.read',
        'openid',
        'relationships.read',
        'role_connections.write',
        'rpc',
        'rpc.activities.write',
        'rpc.notifications.read',
        'rpc.screenshare.read',
        'rpc.screenshare.write',
        'rpc.video.read',
        'rpc.video.write',
        'rpc.voice.read',
        'rpc.voice.write',
        'voice',
        'webhook.incoming',
      ],
    },
  ],
})

export const getOauth2ApplicationsMeRoute = createRoute({
  method: 'get',
  path: '/oauth2/applications/@me',
  operationId: 'get_my_oauth2_application',
  responses: {
    200: {
      description: '200 response for get_my_oauth2_application',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: PrivateApplicationResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getOauth2KeysRoute = createRoute({
  method: 'get',
  path: '/oauth2/keys',
  operationId: 'get_public_keys',
  responses: {
    200: {
      description: '200 response for get_public_keys',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: OAuth2GetKeysSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const getOauth2UserinfoRoute = createRoute({
  method: 'get',
  path: '/oauth2/userinfo',
  operationId: 'get_openid_connect_userinfo',
  responses: {
    200: {
      description: '200 response for get_openid_connect_userinfo',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: OAuth2GetOpenIDConnectUserInfoResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['openid'] }],
})

export const postPartnerSdkProvisionalAccountsUnmergeRoute = createRoute({
  method: 'post',
  path: '/partner-sdk/provisional-accounts/unmerge',
  operationId: 'partner_sdk_unmerge_provisional_account',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              client_id: SnowflakeTypeSchema,
              client_secret: z.string().max(1024).nullable().exactOptional(),
              external_auth_token: z.string().max(10240),
              external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
            })
            .openapi({ required: ['client_id', 'external_auth_token', 'external_auth_type'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    204: {
      description: '204 response for partner_sdk_unmerge_provisional_account',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const postPartnerSdkProvisionalAccountsUnmergeBotRoute = createRoute({
  method: 'post',
  path: '/partner-sdk/provisional-accounts/unmerge/bot',
  operationId: 'bot_partner_sdk_unmerge_provisional_account',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ external_user_id: z.string().max(1024) })
            .openapi({ required: ['external_user_id'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    204: {
      description: '204 response for bot_partner_sdk_unmerge_provisional_account',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postPartnerSdkTokenRoute = createRoute({
  method: 'post',
  path: '/partner-sdk/token',
  operationId: 'partner_sdk_token',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              client_id: SnowflakeTypeSchema,
              client_secret: z.string().max(1024).nullable().exactOptional(),
              external_auth_token: z.string().max(10240),
              external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
            })
            .openapi({ required: ['client_id', 'external_auth_token', 'external_auth_type'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for partner_sdk_token',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ProvisionalTokenResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const postPartnerSdkTokenBotRoute = createRoute({
  method: 'post',
  path: '/partner-sdk/token/bot',
  operationId: 'bot_partner_sdk_token',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              external_user_id: z.string().max(1024),
              preferred_global_name: z.string().min(1).max(32).nullable().exactOptional(),
            })
            .openapi({ required: ['external_user_id'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for bot_partner_sdk_token',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ProvisionalTokenResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getSoundboardDefaultSoundsRoute = createRoute({
  method: 'get',
  path: '/soundboard-default-sounds',
  operationId: 'get_soundboard_default_sounds',
  responses: {
    200: {
      description: '200 response for get_soundboard_default_sounds',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(SoundboardSoundResponseSchema) } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const postStageInstancesRoute = createRoute({
  method: 'post',
  path: '/stage-instances',
  operationId: 'create_stage_instance',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              topic: z.string().min(1).max(120),
              channel_id: SnowflakeTypeSchema,
              privacy_level: z
                .xor([z.null().nullable(), StageInstancesPrivacyLevelsSchema])
                .exactOptional(),
              guild_scheduled_event_id: z
                .xor([z.null().nullable(), SnowflakeTypeSchema])
                .exactOptional(),
              send_start_notification: z.boolean().nullable().exactOptional(),
            })
            .openapi({ required: ['topic', 'channel_id'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_stage_instance',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: StageInstanceResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getStageInstancesChannelIdRoute = createRoute({
  method: 'get',
  path: '/stage-instances/{channel_id}',
  operationId: 'get_stage_instance',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_stage_instance',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: StageInstanceResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteStageInstancesChannelIdRoute = createRoute({
  method: 'delete',
  path: '/stage-instances/{channel_id}',
  operationId: 'delete_stage_instance',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_stage_instance',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchStageInstancesChannelIdRoute = createRoute({
  method: 'patch',
  path: '/stage-instances/{channel_id}',
  operationId: 'update_stage_instance',
  request: {
    params: z.object({
      channel_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'channel_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            topic: z.string().min(1).max(120).exactOptional(),
            privacy_level: StageInstancesPrivacyLevelsSchema.exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_stage_instance',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: StageInstanceResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getStickerPacksRoute = createRoute({
  method: 'get',
  path: '/sticker-packs',
  operationId: 'list_sticker_packs',
  responses: {
    200: {
      description: '200 response for list_sticker_packs',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: StickerPackCollectionResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const getStickerPacksPackIdRoute = createRoute({
  method: 'get',
  path: '/sticker-packs/{pack_id}',
  operationId: 'get_sticker_pack',
  request: {
    params: z.object({
      pack_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'pack_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_sticker_pack',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: StickerPackResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getStickersStickerIdRoute = createRoute({
  method: 'get',
  path: '/stickers/{sticker_id}',
  operationId: 'get_sticker',
  request: {
    params: z.object({
      sticker_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'sticker_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_sticker',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getUsersMeRoute = createRoute({
  method: 'get',
  path: '/users/@me',
  operationId: 'get_my_user',
  responses: {
    200: {
      description: '200 response for get_my_user',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: UserPIIResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['identify'] }],
})

export const patchUsersMeRoute = createRoute({
  method: 'patch',
  path: '/users/@me',
  operationId: 'update_my_user',
  request: {
    body: {
      content: { 'application/json': { schema: BotAccountPatchRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_my_user',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: UserPIIResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getUsersMeApplicationsApplicationIdEntitlementsRoute = createRoute({
  method: 'get',
  path: '/users/@me/applications/{application_id}/entitlements',
  operationId: 'get_current_user_application_entitlements',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      sku_ids: z
        .xor([
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'sku_ids',
                in: 'query',
                schema: {
                  oneOf: [
                    { type: 'string' },
                    {
                      type: 'array',
                      items: {
                        oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SnowflakeType' }],
                      },
                      maxItems: 100,
                      uniqueItems: true,
                    },
                  ],
                },
              },
            }),
          z
            .array(
              z
                .xor([
                  z
                    .null()
                    .nullable()
                    .exactOptional()
                    .openapi({
                      param: {
                        name: 'sku_ids',
                        in: 'query',
                        schema: {
                          oneOf: [
                            { type: 'string' },
                            {
                              type: 'array',
                              items: {
                                oneOf: [
                                  { type: 'null' },
                                  { $ref: '#/components/schemas/SnowflakeType' },
                                ],
                              },
                              maxItems: 100,
                              uniqueItems: true,
                            },
                          ],
                        },
                      },
                    }),
                  SnowflakeTypeSchema,
                ])
                .exactOptional()
                .openapi({
                  param: {
                    name: 'sku_ids',
                    in: 'query',
                    schema: {
                      oneOf: [
                        { type: 'string' },
                        {
                          type: 'array',
                          items: {
                            oneOf: [
                              { type: 'null' },
                              { $ref: '#/components/schemas/SnowflakeType' },
                            ],
                          },
                          maxItems: 100,
                          uniqueItems: true,
                        },
                      ],
                    },
                  },
                }),
            )
            .max(100)
            .exactOptional()
            .openapi({
              param: {
                name: 'sku_ids',
                in: 'query',
                schema: {
                  oneOf: [
                    { type: 'string' },
                    {
                      type: 'array',
                      items: {
                        oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SnowflakeType' }],
                      },
                      maxItems: 100,
                      uniqueItems: true,
                    },
                  ],
                },
              },
            }),
        ])
        .exactOptional()
        .openapi({
          param: {
            name: 'sku_ids',
            in: 'query',
            schema: {
              oneOf: [
                { type: 'string' },
                {
                  type: 'array',
                  items: {
                    oneOf: [{ type: 'null' }, { $ref: '#/components/schemas/SnowflakeType' }],
                  },
                  maxItems: 100,
                  uniqueItems: true,
                },
              ],
            },
          },
        }),
      exclude_consumed: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'exclude_consumed', in: 'query', schema: { type: 'boolean' } } }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_current_user_application_entitlements',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.array(z.xor([z.null().nullable(), EntitlementResponseSchema])),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [
    {
      OAuth2: [
        'activities.invites.write',
        'activities.read',
        'activities.write',
        'applications.builds.read',
        'applications.builds.upload',
        'applications.commands',
        'applications.commands.permissions.update',
        'applications.commands.update',
        'applications.entitlements',
        'applications.store.update',
        'bot',
        'connections',
        'dm_channels.read',
        'email',
        'gdm.join',
        'guilds',
        'guilds.join',
        'guilds.members.read',
        'identify',
        'messages.read',
        'openid',
        'relationships.read',
        'role_connections.write',
        'rpc',
        'rpc.activities.write',
        'rpc.notifications.read',
        'rpc.screenshare.read',
        'rpc.screenshare.write',
        'rpc.video.read',
        'rpc.video.write',
        'rpc.voice.read',
        'rpc.voice.write',
        'voice',
        'webhook.incoming',
      ],
    },
  ],
})

export const getUsersMeApplicationsApplicationIdRoleConnectionRoute = createRoute({
  method: 'get',
  path: '/users/@me/applications/{application_id}/role-connection',
  operationId: 'get_application_user_role_connection',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_application_user_role_connection',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ApplicationUserRoleConnectionResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ OAuth2: ['role_connections.write'] }],
})

export const putUsersMeApplicationsApplicationIdRoleConnectionRoute = createRoute({
  method: 'put',
  path: '/users/@me/applications/{application_id}/role-connection',
  operationId: 'update_application_user_role_connection',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateApplicationUserRoleConnectionRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_application_user_role_connection',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: ApplicationUserRoleConnectionResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ OAuth2: ['role_connections.write'] }],
})

export const deleteUsersMeApplicationsApplicationIdRoleConnectionRoute = createRoute({
  method: 'delete',
  path: '/users/@me/applications/{application_id}/role-connection',
  operationId: 'delete_application_user_role_connection',
  request: {
    params: z.object({
      application_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'application_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_application_user_role_connection',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ OAuth2: ['role_connections.write'] }],
})

export const postUsersMeChannelsRoute = createRoute({
  method: 'post',
  path: '/users/@me/channels',
  operationId: 'create_dm',
  request: {
    body: {
      content: { 'application/json': { schema: CreatePrivateChannelRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for create_dm',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getUsersMeConnectionsRoute = createRoute({
  method: 'get',
  path: '/users/@me/connections',
  operationId: 'list_my_connections',
  responses: {
    200: {
      description: '200 response for list_my_connections',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': { schema: z.array(ConnectedAccountResponseSchema).nullable() },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['connections'] }],
})

export const getUsersMeGuildsRoute = createRoute({
  method: 'get',
  path: '/users/@me/guilds',
  operationId: 'list_my_guilds',
  request: {
    query: z.object({
      before: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'before',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      after: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'after',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      limit: z
        .int()
        .min(1)
        .max(200)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 200 },
          },
        }),
      with_counts: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_counts', in: 'query', schema: { type: 'boolean' } } }),
    }),
  },
  responses: {
    200: {
      description: '200 response for list_my_guilds',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(MyGuildResponseSchema).nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }, { OAuth2: ['guilds'] }],
})

export const deleteUsersMeGuildsGuildIdRoute = createRoute({
  method: 'delete',
  path: '/users/@me/guilds/{guild_id}',
  operationId: 'leave_guild',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for leave_guild',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getUsersMeGuildsGuildIdMemberRoute = createRoute({
  method: 'get',
  path: '/users/@me/guilds/{guild_id}/member',
  operationId: 'get_my_guild_member',
  request: {
    params: z.object({
      guild_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'guild_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_my_guild_member',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: PrivateGuildMemberResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ OAuth2: ['guilds.members.read'] }],
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{user_id}',
  operationId: 'get_user',
  request: {
    params: z.object({
      user_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'user_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_user',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: UserResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getVoiceRegionsRoute = createRoute({
  method: 'get',
  path: '/voice/regions',
  operationId: 'list_voice_regions',
  responses: {
    200: {
      description: '200 response for list_voice_regions',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(VoiceRegionResponseSchema).nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getWebhooksWebhookIdRoute = createRoute({
  method: 'get',
  path: '/webhooks/{webhook_id}',
  operationId: 'get_webhook',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_webhook',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            ApplicationIncomingWebhookResponseSchema,
            ChannelFollowerWebhookResponseSchema,
            GuildIncomingWebhookResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const deleteWebhooksWebhookIdRoute = createRoute({
  method: 'delete',
  path: '/webhooks/{webhook_id}',
  operationId: 'delete_webhook',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_webhook',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const patchWebhooksWebhookIdRoute = createRoute({
  method: 'patch',
  path: '/webhooks/{webhook_id}',
  operationId: 'update_webhook',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().min(1).max(80).exactOptional(),
            avatar: z.string().nullable().exactOptional(),
            channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_webhook',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            ApplicationIncomingWebhookResponseSchema,
            ChannelFollowerWebhookResponseSchema,
            GuildIncomingWebhookResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{ BotToken: [] }],
})

export const getWebhooksWebhookIdWebhookTokenRoute = createRoute({
  method: 'get',
  path: '/webhooks/{webhook_id}/{webhook_token}',
  operationId: 'get_webhook_by_token',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_webhook_by_token',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            ApplicationIncomingWebhookResponseSchema,
            ChannelFollowerWebhookResponseSchema,
            GuildIncomingWebhookResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const postWebhooksWebhookIdWebhookTokenRoute = createRoute({
  method: 'post',
  path: '/webhooks/{webhook_id}/{webhook_token}',
  operationId: 'execute_webhook',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    query: z.object({
      wait: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'wait', in: 'query', schema: { type: 'boolean' } } }),
      thread_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'thread_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      with_components: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_components', in: 'query', schema: { type: 'boolean' } } }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .union([IncomingWebhookRequestPartialSchema, IncomingWebhookUpdateRequestPartialSchema])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
        'application/x-www-form-urlencoded': {
          schema: z
            .union([IncomingWebhookRequestPartialSchema, IncomingWebhookUpdateRequestPartialSchema])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
        'multipart/form-data': {
          schema: z
            .union([IncomingWebhookRequestPartialSchema, IncomingWebhookUpdateRequestPartialSchema])
            .openapi({ 'x-discord-union': 'oneOf' }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for execute_webhook',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    204: {
      description: '204 response for execute_webhook',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const deleteWebhooksWebhookIdWebhookTokenRoute = createRoute({
  method: 'delete',
  path: '/webhooks/{webhook_id}/{webhook_token}',
  operationId: 'delete_webhook_by_token',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_webhook_by_token',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const patchWebhooksWebhookIdWebhookTokenRoute = createRoute({
  method: 'patch',
  path: '/webhooks/{webhook_id}/{webhook_token}',
  operationId: 'update_webhook_by_token',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().min(1).max(80).exactOptional(),
            avatar: z.string().nullable().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_webhook_by_token',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: z.xor([
            ApplicationIncomingWebhookResponseSchema,
            ChannelFollowerWebhookResponseSchema,
            GuildIncomingWebhookResponseSchema,
          ]),
        },
      },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const postWebhooksWebhookIdWebhookTokenGithubRoute = createRoute({
  method: 'post',
  path: '/webhooks/{webhook_id}/{webhook_token}/github',
  operationId: 'execute_github_compatible_webhook',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    query: z.object({
      wait: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'wait', in: 'query', schema: { type: 'boolean' } } }),
      thread_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'thread_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
    }),
    body: { content: { 'application/json': { schema: GithubWebhookSchema } }, required: true },
  },
  responses: {
    204: {
      description: '204 response for execute_github_compatible_webhook',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const getWebhooksWebhookIdWebhookTokenMessagesOriginalRoute = createRoute({
  method: 'get',
  path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
  operationId: 'get_original_webhook_message',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    query: z.object({
      thread_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'thread_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_original_webhook_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const deleteWebhooksWebhookIdWebhookTokenMessagesOriginalRoute = createRoute({
  method: 'delete',
  path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
  operationId: 'delete_original_webhook_message',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    query: z.object({
      thread_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'thread_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_original_webhook_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const patchWebhooksWebhookIdWebhookTokenMessagesOriginalRoute = createRoute({
  method: 'patch',
  path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
  operationId: 'update_original_webhook_message',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    query: z.object({
      thread_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'thread_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      with_components: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_components', in: 'query', schema: { type: 'boolean' } } }),
    }),
    body: {
      content: {
        'application/json': { schema: IncomingWebhookUpdateRequestPartialSchema },
        'application/x-www-form-urlencoded': { schema: IncomingWebhookUpdateRequestPartialSchema },
        'multipart/form-data': {
          schema: IncomingWebhookUpdateRequestPartialSchema.and(
            z.object({
              'files[0]': z.string().exactOptional(),
              'files[1]': z.string().exactOptional(),
              'files[2]': z.string().exactOptional(),
              'files[3]': z.string().exactOptional(),
              'files[4]': z.string().exactOptional(),
              'files[5]': z.string().exactOptional(),
              'files[6]': z.string().exactOptional(),
              'files[7]': z.string().exactOptional(),
              'files[8]': z.string().exactOptional(),
              'files[9]': z.string().exactOptional(),
            }),
          ),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_original_webhook_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const getWebhooksWebhookIdWebhookTokenMessagesMessageIdRoute = createRoute({
  method: 'get',
  path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
  operationId: 'get_webhook_message',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      thread_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'thread_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '200 response for get_webhook_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const deleteWebhooksWebhookIdWebhookTokenMessagesMessageIdRoute = createRoute({
  method: 'delete',
  path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
  operationId: 'delete_webhook_message',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      thread_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'thread_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
    }),
  },
  responses: {
    204: {
      description: '204 response for delete_webhook_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const patchWebhooksWebhookIdWebhookTokenMessagesMessageIdRoute = createRoute({
  method: 'patch',
  path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
  operationId: 'update_webhook_message',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
      message_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'message_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
    }),
    query: z.object({
      thread_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'thread_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
      with_components: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'with_components', in: 'query', schema: { type: 'boolean' } } }),
    }),
    body: {
      content: {
        'application/json': { schema: IncomingWebhookUpdateRequestPartialSchema },
        'application/x-www-form-urlencoded': { schema: IncomingWebhookUpdateRequestPartialSchema },
        'multipart/form-data': {
          schema: IncomingWebhookUpdateRequestPartialSchema.and(
            z.object({
              'files[0]': z.string().exactOptional(),
              'files[1]': z.string().exactOptional(),
              'files[2]': z.string().exactOptional(),
              'files[3]': z.string().exactOptional(),
              'files[4]': z.string().exactOptional(),
              'files[5]': z.string().exactOptional(),
              'files[6]': z.string().exactOptional(),
              'files[7]': z.string().exactOptional(),
              'files[8]': z.string().exactOptional(),
              'files[9]': z.string().exactOptional(),
            }),
          ),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for update_webhook_message',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})

export const postWebhooksWebhookIdWebhookTokenSlackRoute = createRoute({
  method: 'post',
  path: '/webhooks/{webhook_id}/{webhook_token}/slack',
  operationId: 'execute_slack_compatible_webhook',
  request: {
    params: z.object({
      webhook_id: SnowflakeTypeSchema.openapi({
        param: {
          name: 'webhook_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
          required: true,
        },
      }),
      webhook_token: z
        .string()
        .max(152133)
        .openapi({
          param: {
            name: 'webhook_token',
            in: 'path',
            schema: { type: 'string', maxLength: 152133 },
            required: true,
          },
        }),
    }),
    query: z.object({
      wait: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'wait', in: 'query', schema: { type: 'boolean' } } }),
      thread_id: SnowflakeTypeSchema.exactOptional().openapi({
        param: {
          name: 'thread_id',
          in: 'query',
          schema: { $ref: '#/components/schemas/SnowflakeType' },
        },
      }),
    }),
    body: {
      content: {
        'application/json': { schema: SlackWebhookSchema },
        'application/x-www-form-urlencoded': { schema: SlackWebhookSchema },
        'multipart/form-data': { schema: SlackWebhookSchema },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '200 response for execute_slack_compatible_webhook',
      headers: z.object({
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
        'X-RateLimit-Reset-After': XRateLimitResetAfterHeaderSchema,
        'X-RateLimit-Bucket': XRateLimitBucketHeaderSchema,
      }),
      content: { 'application/json': { schema: z.string().nullable() } },
    },
    429: ClientRatelimitedResponse,
    '4XX': ClientErrorResponse,
  },
  security: [{}, { BotToken: [] }],
})
