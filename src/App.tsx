import React from "react"
import {AsyncStorage, View, DrawerPosition} from "react-native"
import {
  createStackNavigator,
  createDrawerNavigator,
  HeaderMode,
} from "react-navigation"
import Toast from "react-native-easy-toast"
import {StoryBuilder} from "."
import {Stories} from "./Stories"

let navigatorRef: any
let toastRef: Toast

export function linkTo(kind: string, name: string) {
  if (kind === "go" && name === "back") navigatorRef._navigation.goBack()
  else navigatorRef._navigation.navigate(kind + name)
}

export function action(name: string) {
  toastRef.show(name, 1000)
}

interface State {
  selectedKind: string
  selectedStory: string
}

export class StoriesApp extends React.Component<any, State> {
  async componentWillMount() {
    const [kind, story] = await AsyncStorage.multiGet([
      "selectedKind",
      "selectedStory",
    ])
    this.setState({selectedKind: kind[1], selectedStory: story[1]})
  }

  render() {
    if (!this.state) return null
    const {selectedKind, selectedStory} = this.state
    let selected = (selectedKind || "") + (selectedStory || "")
    const routes = routeConfig()
    selected = Object.keys(routes).some(it => it == selected) ? selected : null
    const stackNavConfig = stackNavigatorConfig(selected, "none")
    const Stack = createStackNavigator(routes, stackNavConfig)
    const drawerNavConfig = drawerNavigatorConfig(this.state, "none")
    const Drawer = createDrawerNavigator(
      {Root: {screen: Stack}},
      drawerNavConfig
    )
    return (
      <View style={{flex: 1}}>
        <Drawer ref={ref => (navigatorRef = ref)} />
        <Toast
          ref={ref => (toastRef = ref)}
          style={{backgroundColor: "green"}}
          textStyle={{color: "white"}}
          fadeInDuration={500}
          fadeOutDuration={500}
          position={"center"}
        />
      </View>
    )
  }
}

function routeConfig() {
  return StoryBuilder.stories.reduce((prev, val, idx) => {
    const stories = {}
    val.stories.forEach(it => {
      stories[val.kind + it.name] = {
        screen: val.decorator ? () => val.decorator(it.story) : it.story,
      }
    })
    return {...prev, ...stories}
  }, {})
}

function drawerNavigatorConfig(state: State, headerMode: HeaderMode) {
  return {
    backBehavior: "none" as "none" | "initialRoute",
    drawerPosition: "right" as "right" | "left",
    headerMode,
    contentComponent: props => <Stories {...props} selected={state} />,
  }
}

function stackNavigatorConfig(
  initialRouteName: string,
  headerMode: HeaderMode
) {
  return {initialRouteName, headerMode}
}
