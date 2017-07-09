import _ from "lodash"
import React from "react"
import {
  SectionList,
  SectionListData,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextStyle,
  TouchableOpacity
} from "react-native"
import {StoryBuilder} from "."
import {linkTo} from "./App"

export const Stories: React.StatelessComponent<any> = props => {
  return <View style={styles.container}>
    <SectionList
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      sections={getSections()}
      renderSectionHeader={({section}) => renderSectionHeader(section as Section)}
      renderItem={({item}) => renderItem(item)}/>
  </View>
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
      key: it.kind+story.name,
      kind: it.kind,
      name: story.name,
    }))
    const section = result.find(el => el.key == it.kind)
    if (section) section.data.push(...items)
    else result.push({key: it.kind, data: items})
  })
  return result
}

function renderSectionHeader(section: Section) {
  return <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>{section.key}</Text>
  </View>
}

function renderItem(item: Item) {
  return <TouchableOpacity
    style={styles.itemContainer}
    onPress={() => linkTo(item.kind, item.name)}>
    <Text style={styles.itemText}>{item.name}</Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  } as ViewStyle,
  list: {
    flex: 1,
  } as ViewStyle,
  listContainer: {
  } as ViewStyle,
  sectionContainer: {
  } as ViewStyle,
  sectionText: {
    fontSize: 20,
    fontWeight: "bold",
  } as TextStyle,
  itemContainer: {
    justifyContent: "center",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
  } as ViewStyle,
  itemText: {
    fontSize: 16,
  } as TextStyle,
})
