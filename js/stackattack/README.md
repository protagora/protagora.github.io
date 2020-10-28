/*
<!--
    Source (gameplay):
    https://www.youtube.com/watch?v=cjh7mMdTulk

    Video is cached locally: /Users/mmilovanovic/Documents/Zorana/Games/StackAttack/Stack Attack Game On Siemens C45 Old Phone(1).mp4
-->
*/

/*
    Game pipeline:
        - engine runs the clock and orcestrates execution runs,
        - game holds list of entitites that exist in the current gameplay session,
            - physics is physics implementation,
            - controls is user input handler,
        x pubsub is messaging / signaling infrastructure to communicate application state and events,
        - screen is an implementation of display driver,
        x renderer is game entity rendering management utility,
        - composer is screen map assembly utility,
        - log is logging handler,
        - tools are general purpose utility functions.

    User interaction creates or entities and triggers events during gameplay. 
    Clock ticks every N ms and latest user interaction before the tick is used as valid and relevant one.
    Objects states are calculated and checked for collisions, physics is applied to them.
    Once the clock ticks, each active object within gameplay get's rendered if needed. 
    All rendered objects are then composed into the screen map which get's displayed on the screen.
    Then the cycle repeats itself.
*/