import React from "react";
import { AsyncStorage, LayoutAnimation, SectionList, StyleSheet, Text, TouchableOpacity, UIManager, View, } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
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
        AsyncStorage.multiSet([
            ["selectedKind", selectedKind],
            ["selectedStory", selectedStory],
        ]);
        const routeName = selectedKind + selectedStory;
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })],
        }));
        this.setState({ selectedKind, selectedStory });
    }
    onClickSection(selectedKind) {
        LayoutAnimation.easeInEaseOut();
        this.setState({ selectedKind });
    }
    renderSectionHeader(kind) {
        return (<TouchableOpacity onPress={() => this.onClickSection(kind.key)} style={this.styles.sectionContainer}>
        <Text style={this.styles.sectionText}>{kind.key}</Text>
      </TouchableOpacity>);
    }
    renderItem(story) {
        if (this.state.selectedKind != story.kind)
            return null;
        else
            return (<TouchableOpacity style={this.styles.itemContainer} onPress={() => this.navigate(story.name)}>
          <Text style={this.state.selectedStory == story.name
                ? this.styles.itemTextBold
                : this.styles.itemText}>
            {story.name}
          </Text>
        </TouchableOpacity>);
    }
    render() {
        const { selectedKind } = this.state;
        return (<View style={this.styles.container}>
        <SectionList style={this.styles.list} stickySectionHeadersEnabled={false} contentContainerStyle={this.styles.listContainer} sections={this.sections} renderItem={({ item }) => this.renderItem(item)} renderSectionHeader={({ section }) => this.renderSectionHeader(section)}/>
      </View>);
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
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TdG9yaWVzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUE7QUFDekIsT0FBTyxFQUNMLFlBQVksRUFDWixlQUFlLEVBQ2YsV0FBVyxFQUVYLFVBQVUsRUFDVixJQUFJLEVBRUosZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxJQUFJLEdBRUwsTUFBTSxjQUFjLENBQUE7QUFDckIsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFBO0FBQ2hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxHQUFHLENBQUE7QUFZOUIsSUFBSSxTQUFTLENBQUMscUNBQXFDO0lBQ2pELFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUV2RCxNQUFNLE9BQU8sT0FBUSxTQUFRLEtBQUssQ0FBQyxTQUF1QjtJQUd4RCxZQUFZLEtBQUs7UUFDZixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDWixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsRUFBRSxDQUFBO1FBQzdCLElBQUksQ0FBQyxLQUFLLHFCQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBRU8sUUFBUSxDQUFDLGFBQXFCO1FBQ3BDLE1BQU0sRUFBQyxZQUFZLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ2pDLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDcEIsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDO1lBQzlCLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQztTQUNqQyxDQUFDLENBQUE7UUFDRixNQUFNLFNBQVMsR0FBRyxZQUFZLEdBQUcsYUFBYSxDQUFBO1FBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FDNUIsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUNqQixLQUFL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