import _ from "lodash"
import React from "react"
import {StackNavigator, DrawerNavigator} from "react-navigation"
import {StoryBuilder, storyMode} from "."
import {Stories} from "./Stories"

let navigatorRef: any

export class StoriesApp extends React.Component<any, any> {

  componentDidMount() {
    navigatorRef._navigation.navigate("DrawerOpen")
  }

  render() {
    let Navigator = null
    if (storyMode == "stack") {
      Navigator = StackNavigator(routeConfig(Stories), stackNavigatorConfig())
    } else if (storyMode == "drawer") {
      Navigator = DrawerNavigator(routeConfig(null), drawerNavigatorConfig())
    }
    return <Navigator ref={ref => navigatorRef = ref} />
  }
}

export function linkTo(kind: string, name: string) {
  if (kind === "go" && name === "back") {
    storyMode == "drawer" ? action(`${kind} ${name}`) : navigatorRef._navigation.goBack()
  } else navigatorRef._navigation.navigate(kind+name)
}

export function action(name: string) {
  console.warn(name)
}

function routeConfig(rootComponent: any) {
  return StoryBuilder.stories.reduce((prev, val, idx) => {
    const stories = {}
    val.stories.forEach(it => {
      stories[val.kind+it.name] = {
        screen: val.decorator ? () => val.decorator(it.story) : it.story
      }
    })
    return {...prev, ...stories}
  }, rootComponent ? { Root: {screen: rootComponent} } : { })
}

function stackNavigatorConfig() {
  return {
    initialRouteName: "Root",
    headerMode: "none",
  }
}

function drawerNavigatorConfig() {
  return {
    initialRoute: "Root",
    backBehavior: "none",
    contentComponent: props => <Stories {...props} />,
  }
}
