Work-in-progress raycasting-based pseudo-3D rendering and maze generation.  Features TBD.

# TODO

## Map editor enhancements

The map editor currently only allows setting tiles within a small, fixed-size grid.  It should be expanded to support:

- Adjusting the width and height of the map.
- Saving and loading multiple maps.
- Adding exits that link maps to each other.

## Collision

The walls should have collision with the player.  There should be a variable distance allowed between the player and the walls, and if the player is closer than that distance then the walls should prevent further movement.  In addition, if the player approaches a wall at an angle they should "slide" along the wall instead of coming to a dead stop.

## Rendering rework

Currently the rendering cannot be adjusted once it's started.  The rendering function is passed into requestAnimationFrame and then those calls are handled by the browser.  This makes it difficult to restart rendering or adjust rendering parameters (resolution, view radius, and so on) after rendering has started.

To address this, the renderer should be converted into a class.  That class should provide methods for adjusting rendering parameters and should render based on the values of those parameters, and should also track the ID of the current pending frame so that the frame can be cancelled if necessary.

## Minimap

A minimap should be displayed in the Game Window view.  It should show the player's position and their view direction, as well as the tiles of the map.