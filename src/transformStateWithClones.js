'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const finalState = [];
  let newState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action1 = actions[i];

    switch (action1.type) {
      case 'addProperties':
        const addedResults = addProperties(action1, newState);

        finalState.push(addedResults);
        break;

      case 'clear':
        finalState.push({});
        break;

      case 'removeProperties':
        const removedResults = removeProperties(action1, newState);

        finalState.push(removedResults);
        break;

      default:
        throw new Error('Invalid type');
    }

    newState = { ...finalState[finalState.length - 1] };
  }

  return finalState;
}

function addProperties(action1, newState) {
  for (const key in action1.extraData) {
    newState[key] = action1.extraData[key];
  }

  return newState;
}

function removeProperties(action1, newState) {
  for (let j = 0; j < action1.keysToRemove.length; j++) {
    const removed = action1.keysToRemove[j];

    delete newState[removed];
  }

  return newState;
}

module.exports = transformStateWithClones;
