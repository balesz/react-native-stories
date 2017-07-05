/// <reference types="react" />

export interface StoryDelegate {
    (): JSX.Element;
}

export interface DecoratorDelegate {
    (story: () => JSX.Element): JSX.Element;
}

export interface IStoryBuilder {
    add(name: string, story: StoryDelegate): any;
    addDecorator(decor: DecoratorDelegate): any;
}

export declare function storiesOf(kind: string, module: any): IStoryBuilder;

export declare function action(name: string)

export declare function linkTo(kind: string, story: string)

export declare const StoriesApp: React.StatelessComponent<any>