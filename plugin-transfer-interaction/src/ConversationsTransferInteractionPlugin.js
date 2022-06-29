import React from 'react'
import { FlexPlugin } from '@twilio/flex-plugin'

import { setUpActions } from './actions'
import { TransferButton } from './components'

const PLUGIN_NAME = 'ConversationsTransferInteractionPlugin'

export default class ConversationsTransferInteractionPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME)
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    setUpActions()

    flex.TaskCanvasHeader.Content.add(
      <TransferButton key='conversation-park-button' />,
      {
        sortOrder: 1,
        if: props =>
          props.channelDefinition.capabilities.has('Chat') &&
          props.task.taskStatus === 'assigned'
      }
    )

    flex.Actions.addListener('beforeCompleteTask', task => {
      flex.Actions.invokeAction('CloseInteraction', { task: task.task })
    })
  }
}