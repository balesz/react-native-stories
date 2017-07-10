import _ from "lodash"
import React from "react"
import {
  LayoutAnimation,
  LayoutAnimationConfig,
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
import { StoryBuilder } from "."

interface State {
  selectedKind: string
}

if (UIManager.setLayoutAnimationEnabledExperimental)
  UIManager.setLayoutAnimationEnabledExperimental(true)

export class Stories extends React.Component<any, State> {

  private sections: Section[]

  constructor(props) {
    super(props)
    this.sections = getSections()
    this.state = { selectedKind: null }
  }

  private navigate(screen: string) {
    this.props.navigation.navigate(screen)
  }

  private onClickSection(section: string) {
    LayoutAnimation.easeInEaseOut(null as LayoutAnimationConfig)
    this.setState({ selectedKind: section })
  }

  private renderSectionHeader(section: Section) {
    return <TouchableOpacity
      onPress={() => this.onClickSection(section.key)}
      style={this.styles.sectionContainer}>
      <Text style={this.styles.sectionText}>{section.key}</Text>
    </TouchableOpacity>
  }

  private renderItem(item: Item) {
    if (this.state.selectedKind != item.kind) return null
    else return <TouchableOpacity
      style={this.styles.itemContainer}
      onPress={() => this.navigate(item.kind+item.name)}>
      <Text style={this.styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  }

  render() {
    const { selectedKind } = this.state
    return <View style={this.styles.container}>
      <SectionList
        style={this.styles.list}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={this.styles.listContainer}
        sections={this.sections}
        renderItem={({ item }) => this.renderItem(item)}
        renderSectionHeader={({ section }) => this.renderSectionHeader(section)} />
    </View>
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
      listContainer: {
      } as ViewStyle,
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
    })
  }
}

interface Item {
  key: string
  kind: string
  name: string
}

type Section = SectionListData<Item>

function getSections(): Section[] {
  const result: Section[] = []
  StoryBuilder.stories.forEach(it => {
    const items = it.stories.map(story => ({
      key: it.kind + story.name,
      kind: it.kind,
      name: story.name,
    }))
    const section = result.find(el => el.key == it.kind)
    if (section) section.data.push(...items)
    else result.push({ key: it.kind, data: items })
  })
  return result
}
