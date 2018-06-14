export * from "./App"

import React from "react"
import {IStoryBuilder, DecoratorDelegate, StoryDelegate} from ".."

export function storiesOf(kind: string, module: any): IStoryBuilder {
  return new StoryBuilder(kind)
}

export class StoryBuilder implements IStoryBuilder {

  static stories: StoryBuilder[] = []

  kind: string
  stories: {name: string, story: StoryDelegate}[]
  decorator: DecoratorDelegate

  constructor(kind: string) {
    this.kind = kind
    this.stories = []
    StoryBuilder.stories.push(this)
  }

  add(name: string, story: StoryDelegate): IStoryBuilder {
    this.stories.push({name, story})
    return this
  }

  addDecorator(decorator: DecoratorDelegate): IStoryBuilder {
    this.decorator = decorator
    return this
  }
}
