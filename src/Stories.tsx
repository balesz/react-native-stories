import React from "react"
import {
  AsyncStorage,
  LayoutAnimation,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  UIManager,
  View,
  ViewStyle,
} from "react-native"
import {NavigationActions, StackActions} from "react-navigation"
import {StoryBuilder} from "."

interface Props {
  navigation: {dispatch(action: any)}
  selected: State
}

interface State {
  selectedKind: string
  selectedStory: string
}

if (UIManager.setLayoutAnimationEnabledExperimental)
  UIManager.setLayoutAnimationEnabledExperimental(true)

export class Stories extends React.Component<Props, State> {
  private sections: Kind[]

  constructor(props) {
    super(props)
    this.sections = getSections()
    this.state = {...props.selected}
  }

  private navigate(selectedStory: string) {
    const {selectedKind} = this.state
    AsyncStorage.multiSet([
      ["selectedKind", selectedKind],
      ["selectedStory", selectedStory],
    ])
    const routeName = selectedKind + selectedStory
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName})],
      })
    )
    this.setState({selectedKind, selectedStory})
  }

  private onClickSection(selectedKind: string) {
    LayoutAnimation.easeInEaseOut()
    this.setState({selectedKind})
  }

  private renderSectionHeader(kind: Kind) {
    return (
      <TouchableOpacity
        onPress={() => this.onClickSection(kind.key)}
        style={this.styles.sectionContainer}>
        <Text style={this.styles.sectionText}>{kind.key}</Text>
      </TouchableOpacity>
    )
  }

  private renderItem(story: Story) {
    if (this.state.selectedKind != story.kind) return null
    else
      return (
        <TouchableOpacity
          style={this.styles.itemContainer}
          onPress={() => this.navigate(story.name)}>
          <Text
            style={
              this.state.selectedStory == story.name
                ? this.styles.itemTextBold
                : this.styles.itemText
            }>
            {story.name}
          </Text>
        </TouchableOpacity>
      )
  }

  render() {
    const {selectedKind} = this.state
    return (
      <View style={this.styles.container}>
        <SectionList
          style={this.styles.list}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={this.styles.listContainer}
          sections={this.sections}
          renderItem={({item}) => this.renderItem(item)}
          renderSectionHeader={({section}) => this.renderSectionHeader(section)}
        />
      </View>
    )
  }

  private get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 10,
        backgroundColor: "white",
      } as ViewStyle,
      list: {
        flex: 1,
      } as ViewStyle,
      listContainer: {} as ViewStyle,
      listHeader: {
        height: 50,
        justifyContent: "center",
      } as ViewStyle,
      listHeaderText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: "gray",
        borderWidth: 1,
        fontSize: 22,
      } as TextStyle,
      sectionContainer: {
        paddingVertical: 10,
        borderBottomWidth: 0.5,
      } as ViewStyle,
      sectionText: {
        fontSize: 18,
        fontWeight: "bold",
      } as TextStyle,
      itemContainer: {
        justifyContent: "center",
        paddingVertical: 10,
        paddingLeft: 20,
        paddingRight: 10,
      } as ViewStyle,
      itemText: {
        fontSize: 14,
      } as TextStyle,
      itemTextBold: {
        fontSize: 16,
        fontWeight: "bold",
      } as TextStyle,
    })
  }
}

interface Story {
  key: string
  kind: string
  name: string
}

type Kind = SectionListData<Story>

function getSections(): Kind[] {
  const result: Kind[] = []
  StoryBuilder.stories.forEach(it => {
    const items = it.stories.map(story => ({
      key: it.kind + story.name,
      kind: it.kind,
      name: story.name,
    }))
    const section = result.find(el => el.key == it.kind)
    if (section) section.data.push(...items)
    else result.push({key: it.kind, data: items})
  })
  return result
}
