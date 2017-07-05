import _ from "lodash"
import React from "react"
import {StackNavigator} from "react-navigation"
import {StoryBuilder} from "."
import {Stories} from "./Stories"

let navigatorRef: any

export const StoriesApp: React.StatelessComponent<any> = props => {
  const Navigator = StackNavigator(routeConfig(), navigatorConfig())
  return <Navigator ref={ref => navigatorRef = ref} />
}

export function linkTo(kind: string, name: string) {
  navigatorRef._navigation.navigate(getScreenKey(kind, name))
}

export function action(name: string) {
  console.warn(name)
}

function routeConfig() {
  return StoryBuilder.stories.reduce((prev, val, idx) => {
    const stories = {}
    val.stories.forEach(it => {
      stories[getScreenKey(val.kind, it.name)] = {
        screen: val.decorator ? () => val.decorator(it.story) : it.story
      }
    })
    return {...prev, ...stories}
  }, { Root: {screen: Stories} })
}

function navigatorConfig() {
  return {
    initialRouteName: "Root",
    headerMode: "none",
  }
}

export function getScreenKey(kind: string, name: string) {
  return `${_.snakeCase(kind + " " + name)}`
}
