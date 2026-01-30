import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/twilio_api_v2010'

/**
 * GET /2010-04-01/Accounts.json
 *
 * Retrieves a collection of Accounts belonging to the account used to make the request
 *
 * Retrieves a collection of Accounts belonging to the account used to make the request
 */
export async function get20100401AccountsJson(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['2010-04-01']['Accounts.json'].$get(args, options))
}

/**
 * POST /2010-04-01/Accounts.json
 *
 * Create a new Twilio Subaccount from the account making the request
 *
 * Create a new Twilio Subaccount from the account making the request
 */
export async function post20100401AccountsJson(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['2010-04-01']['Accounts.json'].$post(args, options))
}

/**
 * GET /2010-04-01/Accounts/{Sid}.json
 *
 * Fetch the account specified by the provided Account Sid
 *
 * Fetch the account specified by the provided Account Sid
 */
export async function get20100401AccountsSidJson(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['2010-04-01'].Accounts[':Sid.json'].$get(args, options))
}

/**
 * POST /2010-04-01/Accounts/{Sid}.json
 *
 * Modify the properties of a given Account
 *
 * Modify the properties of a given Account
 */
export async function post20100401AccountsSidJson(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['2010-04-01'].Accounts[':Sid.json'].$post(args, options))
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses.json
 */
export async function get20100401AccountsAccountSidAddressesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Addresses.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Addresses.json
 */
export async function post20100401AccountsAccountSidAddressesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Addresses.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export async function get20100401AccountsAccountSidAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export async function post20100401AccountsAccountSidAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export async function delete20100401AccountsAccountSidAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Applications.json
 *
 * Retrieve a list of applications representing an application within the requesting account
 *
 * Retrieve a list of applications representing an application within the requesting account
 */
export async function get20100401AccountsAccountSidApplicationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Applications.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Applications.json
 *
 * Create a new application within your account
 *
 * Create a new application within your account
 */
export async function post20100401AccountsAccountSidApplicationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Applications.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Fetch the application specified by the provided sid
 *
 * Fetch the application specified by the provided sid
 */
export async function get20100401AccountsAccountSidApplicationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Updates the application's properties
 *
 * Updates the application's properties
 */
export async function post20100401AccountsAccountSidApplicationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Delete the application by the specified application sid
 *
 * Delete the application by the specified application sid
 */
export async function delete20100401AccountsAccountSidApplicationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json
 *
 * Fetch an instance of an authorized-connect-app
 *
 * Fetch an instance of an authorized-connect-app
 */
export async function get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].AuthorizedConnectApps[':ConnectAppSid.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json
 *
 * Retrieve a list of authorized-connect-apps belonging to the account used to make the request
 *
 * Retrieve a list of authorized-connect-apps belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidAuthorizedConnectAppsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['AuthorizedConnectApps.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json
 */
export async function get20100401AccountsAccountSidAvailablePhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['AvailablePhoneNumbers.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json
 */
export async function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json
 */
export async function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'Local.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json
 */
export async function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'MachineToMachine.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json
 */
export async function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'Mobile.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json
 */
export async function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'National.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json
 */
export async function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'SharedCost.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json
 */
export async function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'TollFree.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json
 */
export async function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'Voip.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Balance.json
 *
 * Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information
 *
 * Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information
 */
export async function get20100401AccountsAccountSidBalanceJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Balance.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls.json
 *
 * Retrieves a collection of calls made to and from your account
 *
 * Retrieves a collection of calls made to and from your account
 */
export async function get20100401AccountsAccountSidCallsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Calls.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls.json
 *
 * Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections
 *
 * Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections
 */
export async function post20100401AccountsAccountSidCallsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Calls.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Fetch the call specified by the provided Call SID
 *
 * Fetch the call specified by the provided Call SID
 */
export async function get20100401AccountsAccountSidCallsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Initiates a call redirect or terminates a call
 *
 * Initiates a call redirect or terminates a call
 */
export async function post20100401AccountsAccountSidCallsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.
 *
 * Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.
 */
export async function delete20100401AccountsAccountSidCallsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json
 *
 * Retrieve a list of all events for a call.
 *
 * Retrieve a list of all events for a call.
 */
export async function get20100401AccountsAccountSidCallsCallSidEventsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Events.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json
 */
export async function get20100401AccountsAccountSidCallsCallSidNotificationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Notifications[':Sid.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json
 */
export async function get20100401AccountsAccountSidCallsCallSidNotificationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Notifications.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 */
export async function get20100401AccountsAccountSidCallsCallSidRecordingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Recordings.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 *
 * Create a recording for the call
 *
 * Create a recording for the call
 */
export async function post20100401AccountsAccountSidCallsCallSidRecordingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Recordings.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Fetch an instance of a recording for a call
 *
 * Fetch an instance of a recording for a call
 */
export async function get20100401AccountsAccountSidCallsCallSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[':Sid.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.
 */
export async function post20100401AccountsAccountSidCallsCallSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[':Sid.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export async function delete20100401AccountsAccountSidCallsCallSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[':Sid.json'].$delete(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json
 *
 * Fetch an instance of a conference
 *
 * Fetch an instance of a conference
 */
export async function get20100401AccountsAccountSidConferencesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json
 */
export async function post20100401AccountsAccountSidConferencesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':Sid.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences.json
 *
 * Retrieve a list of conferences belonging to the account used to make the request
 *
 * Retrieve a list of conferences belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidConferencesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Conferences.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 */
export async function get20100401AccountsAccountSidConferencesConferenceSidRecordingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
      'Recordings.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Fetch an instance of a recording for a call
 *
 * Fetch an instance of a recording for a call
 */
export async function get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
      ':Sid.json'
    ].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.
 */
export async function post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
      ':Sid.json'
    ].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export async function delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
      ':Sid.json'
    ].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Fetch an instance of a connect-app
 *
 * Fetch an instance of a connect-app
 */
export async function get20100401AccountsAccountSidConnectAppsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Update a connect-app with the specified parameters
 *
 * Update a connect-app with the specified parameters
 */
export async function post20100401AccountsAccountSidConnectAppsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Delete an instance of a connect-app
 *
 * Delete an instance of a connect-app
 */
export async function delete20100401AccountsAccountSidConnectAppsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/ConnectApps.json
 *
 * Retrieve a list of connect-apps belonging to the account used to make the request
 *
 * Retrieve a list of connect-apps belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidConnectAppsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['ConnectApps.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json
 */
export async function get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Addresses[':AddressSid'][
      'DependentPhoneNumbers.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Fetch an incoming-phone-number belonging to the account used to make the request.
 *
 * Fetch an incoming-phone-number belonging to the account used to make the request.
 */
export async function get20100401AccountsAccountSidIncomingPhoneNumbersSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Update an incoming-phone-number instance.
 *
 * Update an incoming-phone-number instance.
 */
export async function post20100401AccountsAccountSidIncomingPhoneNumbersSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Delete a phone-numbers belonging to the account used to make the request.
 *
 * Delete a phone-numbers belonging to the account used to make the request.
 */
export async function delete20100401AccountsAccountSidIncomingPhoneNumbersSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$delete(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 *
 * Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.
 *
 * Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.
 */
export async function get20100401AccountsAccountSidIncomingPhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['IncomingPhoneNumbers.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 *
 * Purchase a phone-number for the account.
 *
 * Purchase a phone-number for the account.
 */
export async function post20100401AccountsAccountSidIncomingPhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['IncomingPhoneNumbers.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json
 *
 * Fetch an instance of an Add-on installation currently assigned to this Number.
 *
 * Fetch an instance of an Add-on installation currently assigned to this Number.
 */
export async function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
      ':ResourceSid'
    ].AssignedAddOns[':Sid.json'].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json
 *
 * Remove the assignment of an Add-on installation from the Number specified.
 *
 * Remove the assignment of an Add-on installation from the Number specified.
 */
export async function delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
      ':ResourceSid'
    ].AssignedAddOns[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 *
 * Retrieve a list of Add-on installations currently assigned to this Number.
 *
 * Retrieve a list of Add-on installations currently assigned to this Number.
 */
export async function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':ResourceSid'][
      'AssignedAddOns.json'
    ].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 *
 * Assign an Add-on installation to the Number specified.
 *
 * Assign an Add-on installation to the Number specified.
 */
export async function post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':ResourceSid'][
      'AssignedAddOns.json'
    ].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid}.json
 *
 * Fetch an instance of an Extension for the Assigned Add-on.
 *
 * Fetch an instance of an Extension for the Assigned Add-on.
 */
export async function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
      ':ResourceSid'
    ].AssignedAddOns[':AssignedAddOnSid'].Extensions[':Sid.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json
 *
 * Retrieve a list of Extensions for the Assigned Add-on.
 *
 * Retrieve a list of Extensions for the Assigned Add-on.
 */
export async function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
      ':ResourceSid'
    ].AssignedAddOns[':AssignedAddOnSid']['Extensions.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 */
export async function get20100401AccountsAccountSidIncomingPhoneNumbersLocalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Local.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 */
export async function post20100401AccountsAccountSidIncomingPhoneNumbersLocalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Local.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 */
export async function get20100401AccountsAccountSidIncomingPhoneNumbersMobileJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Mobile.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 */
export async function post20100401AccountsAccountSidIncomingPhoneNumbersMobileJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Mobile.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 */
export async function get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['TollFree.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 */
export async function post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['TollFree.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export async function get20100401AccountsAccountSidKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export async function post20100401AccountsAccountSidKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export async function delete20100401AccountsAccountSidKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Keys.json
 */
export async function get20100401AccountsAccountSidKeysJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Keys.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Keys.json
 */
export async function post20100401AccountsAccountSidKeysJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Keys.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
 *
 * Fetch a single Media resource associated with a specific Message resource
 *
 * Fetch a single Media resource associated with a specific Message resource
 */
export async function get20100401AccountsAccountSidMessagesMessageSidMediaSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid'].Media[':Sid.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
 *
 * Delete the Media resource.
 *
 * Delete the Media resource.
 */
export async function delete20100401AccountsAccountSidMessagesMessageSidMediaSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid'].Media[':Sid.json'].$delete(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json
 *
 * Read a list of Media resources associated with a specific Message resource
 *
 * Read a list of Media resources associated with a specific Message resource
 */
export async function get20100401AccountsAccountSidMessagesMessageSidMediaJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid']['Media.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json
 *
 * Fetch a specific member from the queue
 *
 * Fetch a specific member from the queue
 */
export async function get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid'].Members[':CallSid.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json
 *
 * Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL
 *
 * Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL
 */
export async function post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid'].Members[':CallSid.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json
 *
 * Retrieve the members of the queue
 *
 * Retrieve the members of the queue
 */
export async function get20100401AccountsAccountSidQueuesQueueSidMembersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid']['Members.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages.json
 *
 * Retrieve a list of Message resources associated with a Twilio Account
 *
 * Retrieve a list of Message resources associated with a Twilio Account
 */
export async function get20100401AccountsAccountSidMessagesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Messages.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages.json
 *
 * Send a message
 *
 * Send a message
 */
export async function post20100401AccountsAccountSidMessagesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Messages.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Fetch a specific Message
 *
 * Fetch a specific Message
 */
export async function get20100401AccountsAccountSidMessagesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)
 *
 * Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)
 */
export async function post20100401AccountsAccountSidMessagesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Deletes a Message resource from your account
 *
 * Deletes a Message resource from your account
 */
export async function delete20100401AccountsAccountSidMessagesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$delete(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Feedback.json
 *
 * Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message
 *
 * Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message
 */
export async function post20100401AccountsAccountSidMessagesMessageSidFeedbackJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid']['Feedback.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 */
export async function get20100401AccountsAccountSidSigningKeysJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['SigningKeys.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 *
 * Create a new Signing Key for the account making the request.
 *
 * Create a new Signing Key for the account making the request.
 */
export async function post20100401AccountsAccountSidSigningKeysJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['SigningKeys.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Notifications/{Sid}.json
 *
 * Fetch a notification belonging to the account used to make the request
 *
 * Fetch a notification belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidNotificationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Notifications[':Sid.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Notifications.json
 *
 * Retrieve a list of notifications belonging to the account used to make the request
 *
 * Retrieve a list of notifications belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidNotificationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Notifications.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Fetch an outgoing-caller-id belonging to the account used to make the request
 *
 * Fetch an outgoing-caller-id belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidOutgoingCallerIdsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Updates the caller-id
 *
 * Updates the caller-id
 */
export async function post20100401AccountsAccountSidOutgoingCallerIdsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Delete the caller-id specified from the account
 *
 * Delete the caller-id specified from the account
 */
export async function delete20100401AccountsAccountSidOutgoingCallerIdsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$delete(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 *
 * Retrieve a list of outgoing-caller-ids belonging to the account used to make the request
 *
 * Retrieve a list of outgoing-caller-ids belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidOutgoingCallerIdsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['OutgoingCallerIds.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 */
export async function post20100401AccountsAccountSidOutgoingCallerIdsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['OutgoingCallerIds.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Fetch an instance of a participant
 *
 * Fetch an instance of a participant
 */
export async function get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
      ':CallSid.json'
    ].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Update the properties of the participant
 *
 * Update the properties of the participant
 */
export async function post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
      ':CallSid.json'
    ].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Kick a participant from a given conference
 *
 * Kick a participant from a given conference
 */
export async function delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
      ':CallSid.json'
    ].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 *
 * Retrieve a list of participants belonging to the account used to make the request
 *
 * Retrieve a list of participants belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidConferencesConferenceSidParticipantsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
      'Participants.json'
    ].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 */
export async function post20100401AccountsAccountSidConferencesConferenceSidParticipantsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
      'Participants.json'
    ].$post(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments.json
 *
 * create an instance of payments. This will start a new payments session
 *
 * create an instance of payments. This will start a new payments session
 */
export async function post20100401AccountsAccountSidCallsCallSidPaymentsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Payments.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments/{Sid}.json
 *
 * update an instance of payments with different phases of payment flows.
 *
 * update an instance of payments with different phases of payment flows.
 */
export async function post20100401AccountsAccountSidCallsCallSidPaymentsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Payments[':Sid.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Fetch an instance of a queue identified by the QueueSid
 *
 * Fetch an instance of a queue identified by the QueueSid
 */
export async function get20100401AccountsAccountSidQueuesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Update the queue with the new parameters
 *
 * Update the queue with the new parameters
 */
export async function post20100401AccountsAccountSidQueuesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Remove an empty queue
 *
 * Remove an empty queue
 */
export async function delete20100401AccountsAccountSidQueuesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues.json
 *
 * Retrieve a list of queues belonging to the account used to make the request
 *
 * Retrieve a list of queues belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidQueuesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Queues.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues.json
 *
 * Create a queue
 *
 * Create a queue
 */
export async function post20100401AccountsAccountSidQueuesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Queues.json'].$post(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions.json
 *
 * Create a Transcription
 *
 * Create a Transcription
 */
export async function post20100401AccountsAccountSidCallsCallSidTranscriptionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Transcriptions.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions/{Sid}.json
 *
 * Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource
 *
 * Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource
 */
export async function post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Transcriptions[
      ':Sid.json'
    ].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
 *
 * Fetch an instance of a recording
 *
 * Fetch an instance of a recording
 */
export async function get20100401AccountsAccountSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':Sid.json'].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export async function delete20100401AccountsAccountSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings.json
 *
 * Retrieve a list of recordings belonging to the account used to make the request
 *
 * Retrieve a list of recordings belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidRecordingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Recordings.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json
 *
 * Fetch an instance of an AddOnResult
 *
 * Fetch an instance of an AddOnResult
 */
export async function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
      ':Sid.json'
    ].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json
 *
 * Delete a result and purge all associated Payloads
 *
 * Delete a result and purge all associated Payloads
 */
export async function delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
      ':Sid.json'
    ].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json
 *
 * Retrieve a list of results belonging to the recording
 *
 * Retrieve a list of results belonging to the recording
 */
export async function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'][
      'AddOnResults.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json
 *
 * Fetch an instance of a result payload
 *
 * Fetch an instance of a result payload
 */
export async function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
      ':AddOnResultSid'
    ].Payloads[':Sid.json'].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json
 *
 * Delete a payload from the result along with all associated Data
 *
 * Delete a payload from the result along with all associated Data
 */
export async function delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
      ':AddOnResultSid'
    ].Payloads[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json
 *
 * Retrieve a list of payloads belonging to the AddOnResult
 *
 * Retrieve a list of payloads belonging to the AddOnResult
 */
export async function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
      ':AddOnResultSid'
    ]['Payloads.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json
 *
 * Fetch an instance of a result payload
 *
 * Fetch an instance of a result payload
 */
export async function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
      ':AddOnResultSid'
    ].Payloads[':PayloadSid']['Data.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json
 */
export async function get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'].Transcriptions[
      ':Sid.json'
    ].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json
 */
export async function delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'].Transcriptions[
      ':Sid.json'
    ].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json
 */
export async function get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'][
      'Transcriptions.json'
    ].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
 *
 * Fetch an instance of a short code
 *
 * Fetch an instance of a short code
 */
export async function get20100401AccountsAccountSidSMSShortCodesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SMS.ShortCodes[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
 *
 * Update a short code with the following parameters
 *
 * Update a short code with the following parameters
 */
export async function post20100401AccountsAccountSidSMSShortCodesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SMS.ShortCodes[':Sid.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json
 *
 * Retrieve a list of short-codes belonging to the account used to make the request
 *
 * Retrieve a list of short-codes belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidSMSShortCodesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SMS['ShortCodes.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export async function get20100401AccountsAccountSidSigningKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export async function post20100401AccountsAccountSidSigningKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export async function delete20100401AccountsAccountSidSigningKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 */
export async function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
      'CredentialListMappings.json'
    ].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 *
 * Create a new credential list mapping resource
 *
 * Create a new credential list mapping resource
 */
export async function post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
      'CredentialListMappings.json'
    ].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json
 *
 * Fetch a specific instance of a credential list mapping
 *
 * Fetch a specific instance of a credential list mapping
 */
export async function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].Auth.Calls.CredentialListMappings[':Sid.json'].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json
 *
 * Delete a credential list mapping from the requested domain
 *
 * Delete a credential list mapping from the requested domain
 */
export async function delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].Auth.Calls.CredentialListMappings[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 *
 * Retrieve a list of IP Access Control List mappings belonging to the domain used in the request
 *
 * Retrieve a list of IP Access Control List mappings belonging to the domain used in the request
 */
export async function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
      'IpAccessControlListMappings.json'
    ].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 *
 * Create a new IP Access Control List mapping
 *
 * Create a new IP Access Control List mapping
 */
export async function post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
      'IpAccessControlListMappings.json'
    ].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json
 *
 * Fetch a specific instance of an IP Access Control List mapping
 *
 * Fetch a specific instance of an IP Access Control List mapping
 */
export async function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].Auth.Calls.IpAccessControlListMappings[':Sid.json'].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json
 *
 * Delete an IP Access Control List mapping from the requested domain
 *
 * Delete an IP Access Control List mapping from the requested domain
 */
export async function delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].Auth.Calls.IpAccessControlListMappings[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 */
export async function get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Registrations[
      'CredentialListMappings.json'
    ].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 *
 * Create a new credential list mapping resource
 *
 * Create a new credential list mapping resource
 */
export async function post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Registrations[
      'CredentialListMappings.json'
    ].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json
 *
 * Fetch a specific instance of a credential list mapping
 *
 * Fetch a specific instance of a credential list mapping
 */
export async function get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].Auth.Registrations.CredentialListMappings[':Sid.json'].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json
 *
 * Delete a credential list mapping from the requested domain
 *
 * Delete a credential list mapping from the requested domain
 */
export async function delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].Auth.Registrations.CredentialListMappings[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 *
 * Retrieve a list of credentials.
 *
 * Retrieve a list of credentials.
 */
export async function get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':CredentialListSid'][
      'Credentials.json'
    ].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 *
 * Create a new credential resource.
 *
 * Create a new credential resource.
 */
export async function post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':CredentialListSid'][
      'Credentials.json'
    ].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Fetch a single credential.
 *
 * Fetch a single credential.
 */
export async function get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
      ':CredentialListSid'
    ].Credentials[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Update a credential resource.
 *
 * Update a credential resource.
 */
export async function post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
      ':CredentialListSid'
    ].Credentials[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Delete a credential resource.
 *
 * Delete a credential resource.
 */
export async function delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
      ':CredentialListSid'
    ].Credentials[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 *
 * Get All Credential Lists
 *
 * Get All Credential Lists
 */
export async function get20100401AccountsAccountSidSIPCredentialListsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP['CredentialLists.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 *
 * Create a Credential List
 *
 * Create a Credential List
 */
export async function post20100401AccountsAccountSidSIPCredentialListsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP['CredentialLists.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Get a Credential List
 *
 * Get a Credential List
 */
export async function get20100401AccountsAccountSidSIPCredentialListsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Update a Credential List
 *
 * Update a Credential List
 */
export async function post20100401AccountsAccountSidSIPCredentialListsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Delete a Credential List
 *
 * Delete a Credential List
 */
export async function delete20100401AccountsAccountSidSIPCredentialListsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$delete(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 *
 * Read multiple CredentialListMapping resources from an account.
 *
 * Read multiple CredentialListMapping resources from an account.
 */
export async function get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
      'CredentialListMappings.json'
    ].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 *
 * Create a CredentialListMapping resource for an account.
 *
 * Create a CredentialListMapping resource for an account.
 */
export async function post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
      'CredentialListMappings.json'
    ].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json
 *
 * Fetch a single CredentialListMapping resource from an account.
 *
 * Fetch a single CredentialListMapping resource from an account.
 */
export async function get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].CredentialListMappings[
      ':Sid.json'
    ].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json
 *
 * Delete a CredentialListMapping resource from an account.
 *
 * Delete a CredentialListMapping resource from an account.
 */
export async function delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].CredentialListMappings[
      ':Sid.json'
    ].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 *
 * Retrieve a list of domains belonging to the account used to make the request
 *
 * Retrieve a list of domains belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidSIPDomainsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP['Domains.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 *
 * Create a new Domain
 *
 * Create a new Domain
 */
export async function post20100401AccountsAccountSidSIPDomainsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP['Domains.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Fetch an instance of a Domain
 *
 * Fetch an instance of a Domain
 */
export async function get20100401AccountsAccountSidSIPDomainsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Update the attributes of a domain
 *
 * Update the attributes of a domain
 */
export async function post20100401AccountsAccountSidSIPDomainsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Delete an instance of a Domain
 *
 * Delete an instance of a Domain
 */
export async function delete20100401AccountsAccountSidSIPDomainsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 *
 * Retrieve a list of IpAccessControlLists that belong to the account used to make the request
 *
 * Retrieve a list of IpAccessControlLists that belong to the account used to make the request
 */
export async function get20100401AccountsAccountSidSIPIpAccessControlListsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP['IpAccessControlLists.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 *
 * Create a new IpAccessControlList resource
 *
 * Create a new IpAccessControlList resource
 */
export async function post20100401AccountsAccountSidSIPIpAccessControlListsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP['IpAccessControlLists.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Fetch a specific instance of an IpAccessControlList
 *
 * Fetch a specific instance of an IpAccessControlList
 */
export async function get20100401AccountsAccountSidSIPIpAccessControlListsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Rename an IpAccessControlList
 *
 * Rename an IpAccessControlList
 */
export async function post20100401AccountsAccountSidSIPIpAccessControlListsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Delete an IpAccessControlList from the requested account
 *
 * Delete an IpAccessControlList from the requested account
 */
export async function delete20100401AccountsAccountSidSIPIpAccessControlListsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$delete(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json
 *
 * Fetch an IpAccessControlListMapping resource.
 *
 * Fetch an IpAccessControlListMapping resource.
 */
export async function get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].IpAccessControlListMappings[':Sid.json'].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json
 *
 * Delete an IpAccessControlListMapping resource.
 *
 * Delete an IpAccessControlListMapping resource.
 */
export async function delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].IpAccessControlListMappings[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 *
 * Retrieve a list of IpAccessControlListMapping resources.
 *
 * Retrieve a list of IpAccessControlListMapping resources.
 */
export async function get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
      'IpAccessControlListMappings.json'
    ].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 *
 * Create a new IpAccessControlListMapping resource.
 *
 * Create a new IpAccessControlListMapping resource.
 */
export async function post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
      'IpAccessControlListMappings.json'
    ].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 *
 * Read multiple IpAddress resources.
 *
 * Read multiple IpAddress resources.
 */
export async function get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
      ':IpAccessControlListSid'
    ]['IpAddresses.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 *
 * Create a new IpAddress resource.
 *
 * Create a new IpAddress resource.
 */
export async function post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
      ':IpAccessControlListSid'
    ]['IpAddresses.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Read one IpAddress resource.
 *
 * Read one IpAddress resource.
 */
export async function get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
      ':IpAccessControlListSid'
    ].IpAddresses[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Update an IpAddress resource.
 *
 * Update an IpAddress resource.
 */
export async function post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
      ':IpAccessControlListSid'
    ].IpAddresses[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Delete an IpAddress resource.
 *
 * Delete an IpAddress resource.
 */
export async function delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
      ':IpAccessControlListSid'
    ].IpAddresses[':Sid.json'].$delete(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec.json
 *
 * Create a Siprec
 *
 * Create a Siprec
 */
export async function post20100401AccountsAccountSidCallsCallSidSiprecJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Siprec.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec/{Sid}.json
 *
 * Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource
 *
 * Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource
 */
export async function post20100401AccountsAccountSidCallsCallSidSiprecSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Siprec[':Sid.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams.json
 *
 * Create a Stream
 *
 * Create a Stream
 */
export async function post20100401AccountsAccountSidCallsCallSidStreamsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Streams.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams/{Sid}.json
 *
 * Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource
 *
 * Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource
 */
export async function post20100401AccountsAccountSidCallsCallSidStreamsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Streams[':Sid.json'].$post(
      args,
      options,
    ),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Tokens.json
 *
 * Create a new token for ICE servers
 *
 * Create a new token for ICE servers
 */
export async function post20100401AccountsAccountSidTokensJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Tokens.json'].$post(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json
 *
 * Fetch an instance of a Transcription
 *
 * Fetch an instance of a Transcription
 */
export async function get20100401AccountsAccountSidTranscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Transcriptions[':Sid.json'].$get(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json
 *
 * Delete a transcription from the account used to make the request
 *
 * Delete a transcription from the account used to make the request
 */
export async function delete20100401AccountsAccountSidTranscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Transcriptions[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Transcriptions.json
 *
 * Retrieve a list of transcriptions belonging to the account used to make the request
 *
 * Retrieve a list of transcriptions belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidTranscriptionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid']['Transcriptions.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records.json
 *
 * Retrieve a list of usage-records belonging to the account used to make the request
 *
 * Retrieve a list of usage-records belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidUsageRecordsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage['Records.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json
 */
export async function get20100401AccountsAccountSidUsageRecordsAllTimeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['AllTime.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json
 */
export async function get20100401AccountsAccountSidUsageRecordsDailyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Daily.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json
 */
export async function get20100401AccountsAccountSidUsageRecordsLastMonthJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['LastMonth.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json
 */
export async function get20100401AccountsAccountSidUsageRecordsMonthlyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Monthly.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json
 */
export async function get20100401AccountsAccountSidUsageRecordsThisMonthJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['ThisMonth.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json
 */
export async function get20100401AccountsAccountSidUsageRecordsTodayJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Today.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json
 */
export async function get20100401AccountsAccountSidUsageRecordsYearlyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Yearly.json'].$get(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json
 */
export async function get20100401AccountsAccountSidUsageRecordsYesterdayJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Yesterday.json'].$get(
      args,
      options,
    ),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 *
 * Fetch and instance of a usage-trigger
 *
 * Fetch and instance of a usage-trigger
 */
export async function get20100401AccountsAccountSidUsageTriggersSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 *
 * Update an instance of a usage trigger
 *
 * Update an instance of a usage trigger
 */
export async function post20100401AccountsAccountSidUsageTriggersSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 */
export async function delete20100401AccountsAccountSidUsageTriggersSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$delete(args, options),
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 *
 * Retrieve a list of usage-triggers belonging to the account used to make the request
 *
 * Retrieve a list of usage-triggers belonging to the account used to make the request
 */
export async function get20100401AccountsAccountSidUsageTriggersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage['Triggers.json'].$get(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 *
 * Create a new UsageTrigger
 *
 * Create a new UsageTrigger
 */
export async function post20100401AccountsAccountSidUsageTriggersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Usage['Triggers.json'].$post(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessages.json
 *
 * Create a new User Defined Message for the given Call SID.
 *
 * Create a new User Defined Message for the given Call SID.
 */
export async function post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'][
      'UserDefinedMessages.json'
    ].$post(args, options),
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions.json
 *
 * Subscribe to User Defined Messages for a given Call SID.
 *
 * Subscribe to User Defined Messages for a given Call SID.
 */
export async function post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'][
      'UserDefinedMessageSubscriptions.json'
    ].$post(args, options),
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions/{Sid}.json
 *
 * Delete a specific User Defined Message Subscription.
 *
 * Delete a specific User Defined Message Subscription.
 */
export async function delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].UserDefinedMessageSubscriptions[
      ':Sid.json'
    ].$delete(args, options),
  )
}
