import { reactive, toRefs } from 'vue';

export function createEmitter() {
  const listeners = reactive(new Map());

  function on(event, handler) {
    let eventListeners = listeners.get(event);
    if (!eventListeners) {
      eventListeners = new Set();
      listeners.set(event, eventListeners);
    }
    eventListeners.add(handler);
  }

  function off(event, handler) {
    const eventListeners = listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(handler);
    }
  }

  function emit(event, ...args) {
    const eventListeners = listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(handler => handler(...args));
    }
  }

  return { ...toRefs(listeners), on, off, emit };
}