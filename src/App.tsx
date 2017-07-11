import _ from "lodash"
import React from "react"
import { AsyncStorage } from "react-native"
import { StackNavigator, DrawerNavigator } from "react-navigation"
import { StoryBuilder } from "."
import { Stories } from "./Stories"

let navigatorRef: any

export function linkTo(kind: string, name: string) {
  if (kind === "go" && name === "back") navigatorRef._navigation.goBack()
  else navigatorRef._navigation.navigate(kind + name)
}

export function action(name: string) {
  console.warn(name)
}

interface State {
  selectedKind: string
  selectedStory: string
}

export class StoriesApp extends React.Component<any, State> {

  componentWillMount() {
    AsyncStorage.multiGet(["selectedKind", "selectedStory"])
      .then(([kind, story]) => this.setState({
        selectedKind: kind[1], selectedStory: story[1]
      }))
  }

  render() {
    if (!this.state) return null
    const { selectedKind, selectedStory } = this.state
    const selected = (selectedKind || "") + (selectedStory || "")
    const stackNavConfig = stackNavigatorConfig(selected)
    const Stack = StackNavigator(routeConfig(), stackNavConfig)
    const drawerNavConfig = drawerNavigatorConfig(this.state)
    const Drawer = DrawerNavigator({ Root: { screen: Stack } }, drawerNavConfig)
    return <Drawer ref={ref => navigatorRef = ref} />
  }
}

function routeConfig() {
  return StoryBuilder.stories.reduce((prev, val, idx) => {
    const stories = {}
    val.stories.forEach(it => {
      stories[val.kind + it.name] = {
        screen: val.decorator ? () => val.decorator(it.story) : it.story
      }
    })
    return { ...prev, ...stories }
  }, {})
}

function drawerNavigatorConfig(state: State) {
  return {
    backBehavior: "none", drawerPosition: "right",
    contentComponent: props => <Stories {...props} selected={state} />
  }
}

function stackNavigatorConfig(initialRouteName: string) {
  return { initialRouteName, headerMode: "none", }
}
