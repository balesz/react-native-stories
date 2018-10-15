var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import { AsyncStorage, View } from "react-native";
import { createStackNavigator, createDrawerNavigator, } from "react-navigation";
import Toast from "react-native-easy-toast";
import { StoryBuilder } from ".";
import { Stories } from "./Stories";
let navigatorRef;
let toastRef;
export function linkTo(kind, name) {
    if (kind === "go" && name === "back")
        navigatorRef._navigation.goBack();
    else
        navigatorRef._navigation.navigate(kind + name);
}
export function action(name) {
    toastRef.show(name, 1000);
}
export class StoriesApp extends React.Component {
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const [kind, story] = yield AsyncStorage.multiGet([
                "selectedKind",
                "selectedStory",
            ]);
            this.setState({ selectedKind: kind[1], selectedStory: story[1] });
        });
    }
    render() {
        if (!this.state)
            return null;
        const { selectedKind, selectedStory } = this.state;
        let selected = (selectedKind || "") + (selectedStory || "");
        const routes = routeConfig();
        selected = Object.keys(routes).some(it => it == selected) ? selected : null;
        const stackNavConfig = stackNavigatorConfig(selected, "none");
        const Stack = createStackNavigator(routes, stackNavConfig);
        const drawerNavConfig = drawerNavigatorConfig(this.state, "none");
        const Drawer = createDrawerNavigator({ Root: { screen: Stack } }, drawerNavConfig);
        return (<View style={{ flex: 1 }}>
        <Drawer ref={ref => (navigatorRef = ref)}/>
        <Toast ref={ref => (toastRef = ref)} style={{ backgroundColor: "green" }} textStyle={{ color: "white" }} fadeInDuration={500} fadeOutDuration={500} position={"center"}/>
      </View>);
    }
}
function routeConfig() {
    return StoryBuilder.stories.reduce((prev, val, idx) => {
        const stories = {};
        val.stories.forEach(it => {
            stories[val.kind + it.name] = {
                screen: val.decorator ? () => val.decorator(it.story) : it.story,
            };
        });
        return Object.assign({}, prev, stories);
    }, {});
}
function drawerNavigatorConfig(state, headerMode) {
    return {
        backBehavior: "none",
        drawerPosition: "right",
        headerMode,
        contentComponent: props => <Stories {...props} selected={state}/>,
    };
}
function stackNavigatorConfig(initialRouteName, headerMode) {
    return { initialRouteName, headerMode };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwcC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUE7QUFDekIsT0FBTyxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQWlCLE1BQU0sY0FBYyxDQUFBO0FBQy9ELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIscUJBQXFCLEdBRXRCLE1BQU0sa0JBQWtCLENBQUE7QUFDekIsT0FBTyxLQUFLLE1BQU0seUJBQXlCLENBQUE7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLEdBQUcsQ0FBQTtBQUM5QixPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFBO0FBRWpDLElBQUksWUFBaUIsQ0FBQTtBQUNyQixJQUFJLFFBQWUsQ0FBQTtBQUVuQixNQUFNLFVBQVUsTUFBTSxDQUFDLElBQVksRUFBRSxJQUFZO0lBQy9DLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssTUFBTTtRQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUE7O1FBQ2xFLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUNyRCxDQUFDO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxJQUFZO0lBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzNCLENBQUM7QUFPRCxNQUFNLE9BQU8sVUFBVyxTQUFRLEtBQUssQ0FBQyxTQUFxQjtJQUNuRCxrQkFBa0I7O1lBQ3RCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUFDO2dCQUNoRCxjQUFjO2dCQUNkLGVBQWU7YUFDaEIsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFlBQVksRUFBRSxJQUFJ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