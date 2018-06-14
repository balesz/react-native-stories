/// <reference types="react" />

declare const module: any

export interface StoryDelegate {
    (): JSX.Element
}

export interface DecoratorDelegate {
    (story: () => JSX.Element): JSX.Element
}

export interface IStoryBuilder {
    add(name: string, story: StoryDelegate): IStoryBuilder
    addDecorator(decor: DecoratorDelegate): IStoryBuilder
}

export declare function storiesOf(kind: string, module: any): IStoryBuilder

export declare function action(name: string)

export declare function linkTo(kind: string, story: string)

export declare const StoriesApp: React.StatelessComponent<any>
