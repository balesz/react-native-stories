import React from "react";
import { AsyncStorage, LayoutAnimation, SectionList, StyleSheet, Text, TouchableOpacity, UIManager, View, } from "react-native";
import { NavigationActions } from "react-navigation";
import { StoryBuilder } from ".";
if (UIManager.setLayoutAnimationEnabledExperimental)
    UIManager.setLayoutAnimationEnabledExperimental(true);
export class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.sections = getSections();
        this.state = Object.assign({}, props.selected);
    }
    navigate(selectedStory) {
        const { selectedKind } = this.state;
        AsyncStorage.multiSet([["selectedKind", selectedKind], ["selectedStory", selectedStory]]);
        const routeName = selectedKind + selectedStory;
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0, actions: [NavigationActions.navigate({ routeName })]
        }));
        this.setState({ selectedKind, selectedStory });
    }
    onClickSection(selectedKind) {
        LayoutAnimation.easeInEaseOut();
        this.setState({ selectedKind });
    }
    renderSectionHeader(kind) {
        return <TouchableOpacity onPress={() => this.onClickSection(kind.key)} style={this.styles.sectionContainer}>
      <Text style={this.styles.sectionText}>{kind.key}</Text>
    </TouchableOpacity>;
    }
    renderItem(story) {
        if (this.state.selectedKind != story.kind)
            return null;
        else
            return <TouchableOpacity style={this.styles.itemContainer} onPress={() => this.navigate(story.name)}>
      <Text style={this.state.selectedStory == story.name ? this.styles.itemTextBold : this.styles.itemText}>
        {story.name}
      </Text>
    </TouchableOpacity>;
    }
    render() {
        const { selectedKind } = this.state;
        return <View style={this.styles.container}>
      <SectionList style={this.styles.list} stickySectionHeadersEnabled={false} contentContainerStyle={this.styles.listContainer} sections={this.sections} renderItem={({ item }) => this.renderItem(item)} renderSectionHeader={({ section }) => this.renderSectionHeader(section)}/>
    </View>;
    }
    get styles() {
        return StyleSheet.create({
            container: {
                flex: 1,
                paddingTop: 30,
                paddingHorizontal: 10,
                backgroundColor: "white",
            },
            list: {
                flex: 1,
            },
            listContainer: {},
            listHeader: {
                height: 50,
                justifyContent: "center",
            },
            listHeaderText: {
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderColor: "gray",
                borderWidth: 1,
                fontSize: 22,
            },
            sectionContainer: {
                paddingVertical: 10,
                borderBottomWidth: 0.5,
            },
            sectionText: {
                fontSize: 18,
                fontWeight: "bold",
            },
            itemContainer: {
                justifyContent: "center",
                paddingVertical: 10,
                paddingLeft: 20,
                paddingRight: 10,
            },
            itemText: {
                fontSize: 14,
            },
            itemTextBold: {
                fontSize: 16,
                fontWeight: "bold",
            }
        });
    }
}
function getSections() {
    const result = [];
    StoryBuilder.stories.forEach(it => {
        const items = it.stories.map(story => ({
            key: it.kind + story.name,
            kind: it.kind,
            name: story.name,
        }));
        const section = result.find(el => el.key == it.kind);
        if (section)
            section.data.push(...items);
        else
            result.push({ key: it.kind, data: items });
    });
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TdG9yaWVzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUE7QUFDekIsT0FBTyxFQUNMLFlBQVksRUFDWixlQUFlLEVBR2YsV0FBVyxFQUVYLFVBQVUsRUFDVixJQUFJLEVBRUosZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxJQUFJLEdBRUwsTUFBTSxjQUFjLENBQUE7QUFDckIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEdBQUcsQ0FBQTtBQVloQyxJQUFJLFNBQVMsQ0FBQyxxQ0FBcUM7SUFDakQsU0FBUyxDQUFDLHFDQUFxQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBRXZELE1BQU0sY0FBZSxTQUFRLEtBQUssQ0FBQyxTQUF1QjtJQUl4RCxZQUFZLEtBQUs7UUFDZixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDWixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsRUFBRSxDQUFBO1FBQzdCLElBQUksQ0FBQyxLQUFLLHFCQUFRLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQTtJQUNwQyxDQUFDO0lBRU8sUUFBUSxDQUFDLGFBQXFCO1FBQ3BDLE1BQU0sRUFBQyxZQUFZLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ2pDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekYsTUFBTSxTQUFTLEdBQUcsWUFBWSxHQUFHLGFBQWEsQ0FBQTtRQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1lBQ3JELEtBQUssRUFBRSxDQUFDLEVBQUUs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