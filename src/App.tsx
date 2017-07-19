import React from "react"
import { AsyncStorage, View } from "react-native"
import { StackNavigator, DrawerNavigator } from "react-navigation"
import Toast from "react-native-easy-toast"
import { StoryBuilder } from "."
import { Stories } from "./Stories"

let navigatorRef: any
let toastRef: Toast

export function linkTo(kind: string, name: string) {
  if (kind === "go" && name === "back") navigatorRef._navigation.goBack()
  else navigatorRef._navigation.navigate(kind + name)
}

export function action(name: string) {
  toastRef.show(name, 2000)
}

interface State {
  selectedKind: string
  selectedStory: string
}

export class StoriesApp extends React.Component<any, State> {

  async componentWillMount() {
    const [kind, story] = await AsyncStorage
      .multiGet(["selectedKind", "selectedStory"])
    this.setState({selectedKind: kind[1], selectedStory: story[1]})
  }

  render() {
    if (!this.state) return null
    const { selectedKind, selectedStory } = this.state
    let selected = (selectedKind || "") + (selectedStory || "")
    const routes = routeConfig()
    selected = Object.keys(routes).some(it => it == selected) ? selected : null
    const stackNavConfig = stackNavigatorConfig(selected)
    const Stack = StackNavigator(routes, stackNavConfig)
    const drawerNavConfig = drawerNavigatorConfig(this.state)
    const Drawer = DrawerNavigator({ Root: { screen: Stack } }, drawerNavConfig)
    return <View style={{flex: 1}}>
      <Drawer ref={ref => navigatorRef = ref} />
      <Toast ref={ref => toastRef = ref}
        style={{backgroundColor: "green"}}
        textStyle={{color: "white"}}
        position={"center"} />
    </View>
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
