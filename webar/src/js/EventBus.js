import { createEmitter } from "./createEmitter";

export const EventBus = createEmitter();

EventBus.select = [];

EventBus.setState = function(value) {
  this.select.push(value);
};

EventBus.getState = function() {
  return this.select.pop();
};
