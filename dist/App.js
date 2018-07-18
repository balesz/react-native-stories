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
import { StackNavigator, DrawerNavigator } from "react-navigation";
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
            const [kind, story] = yield AsyncStorage
                .multiGet(["selectedKind", "selectedStory"]);
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
        const stackNavConfig = stackNavigatorConfig(selected);
        const Stack = StackNavigator(routes, stackNavConfig);
        const drawerNavConfig = drawerNavigatorConfig(this.state);
        const Drawer = DrawerNavigator({ Root: { screen: Stack } }, drawerNavConfig);
        return <View style={{ flex: 1 }}>
      <Drawer ref={ref => navigatorRef = ref}/>
      <Toast ref={ref => toastRef = ref} style={{ backgroundColor: "green" }} textStyle={{ color: "white" }} fadeInDuration={500} fadeOutDuration={500} position={"center"}/>
    </View>;
    }
}
function routeConfig() {
    return StoryBuilder.stories.reduce((prev, val, idx) => {
        const stories = {};
        val.stories.forEach(it => {
            stories[val.kind + it.name] = {
                screen: val.decorator ? () => val.decorator(it.story) : it.story
            };
        });
        return Object.assign({}, prev, stories);
    }, {});
}
function drawerNavigatorConfig(state) {
    return {
        backBehavior: "none", drawerPosition: "right",
        contentComponent: props => <Stories {...props} selected={state}/>
    };
}
function stackNavigatorConfig(initialRouteName) {
    return { initialRouteName, headerMode: "none", };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwcC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUE7QUFDekIsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUNsRSxPQUFPLEtBQUssTUFBTSx5QkFBeUIsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sR0FBRyxDQUFBO0FBQ2hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFFbkMsSUFBSSxZQUFpQixDQUFBO0FBQ3JCLElBQUksUUFBZSxDQUFBO0FBRW5CLE1BQU0saUJBQWlCLElBQVksRUFBRSxJQUFZO0lBQy9DLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssTUFBTTtRQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUE7O1FBQ2xFLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUNyRCxDQUFDO0FBRUQsTUFBTSxpQkFBaUIsSUFBWTtJQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUMzQixDQUFDO0FBT0QsTUFBTSxpQkFBa0IsU0FBUSxLQUFLLENBQUMsU0FBcUI7SUFFbkQsa0JBQWtCOztZQUN0QixNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sWUFBWTtpQkFDckMsUUFBUSxDQUFDLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUE7WUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxF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