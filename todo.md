
Make a `todo.md` that I can use as a checklist for building this project.

Draft a detailed, step-by-step blueprint for building this project. Then, once you have a solid plan, break it down into small, iterative chunks that build on each other. Look at these chunks and then go another round to break it into small steps. review the results and make sure that the steps are small enough to be implemented safely, but big enough to move the project forward. Iterate until you feel that the steps are right sized for this project.
From here you should have the foundation to provide a series of prompts for a code-generation LLM that will implement each step. Prioritize best practices, and incremental progress, ensuring no big jumps in complexity at any stage. Make sure that each prompt builds on the previous prompts, and ends with wiring things together. There should be no hanging or orphaned code that isn't integrated into a previous step.
Make sure and separate each prompt section. Use markdown. Each prompt should be tagged as text using code tags. The goal is to output prompts, but context, etc is important as well.

Compile our findings into a comprehensive, developer-ready specification. 
Include all relevant requirements, architecture choices, data handling details, error handling strategies, so a developer can immediately begin implementation.
API context:
# Dune Analytics API

Dune is a web-based platform that allows you to query public blockchain data and aggregate it into beautiful dashboards.

import { QueryParameter, DuneClient, RunQueryArgs } from "@duneanalytics/client-sdk";
const { DUNE_API_KEY } = process.env;

const client = new DuneClient(DUNE_API_KEY ?? "");
const queryId = 1215383;
const opts: RunQueryArgs = {
queryId,
query_parameters: [
QueryParameter.text("TextField", "Plain Text"),
QueryParameter.number("NumberField", 3.1415926535),
QueryParameter.date("DateField", "2022-05-04 00:00:00"),
QueryParameter.enum("ListField", "Option 1"),
],
};

client
.runQuery(opts)
.then((executionResult) => console.log(executionResult.result?.rows));

// should look like
// [
// {
// date_field: "2022-05-04 00:00:00.000",
// list_field: "Option 1",
// number_field: "3.1415926535",
// text_field: "Plain Text",
// },
// ]

- allOf:
                                    - *id003
                                    - type: object
                                      required:
                                      - type
                                      - url
                                      - width
                                      - height
                                      properties:
                                        type:
                                          type: string
                                          enum:
                                          - photo
                                        url:
                                          type:
                                          - string
                                          - 'null'
                                          description: The source URL of the image.
                                            Consumers should be able to insert this
                                            URL into an <img> element. Only HTTP and
                                            HTTPS URLs are valid.
                                        width:
                                          type:
                                          - number
                                          - 'null'
                                          description: The width in pixels of the
                                            image specified in the url parameter.
                                        height:
                                          type:
                                          - number
                                          - 'null'
                                          description: The height in pixels of the
                                            image specified in the url parameter.
                                  - allOf:
                                    - *id003
                                    - type: object
                                      required:
                                      - type
                                      properties:
                                        type:
                                          type: string
                                          enum:
                                          - link
                                  discriminator:
                                    propertyName: type
                                    mapping:
                                      rich: '#/components/schemas/OembedRichData'
                                      video: '#/components/schemas/OembedVideoData'
                                      photo: '#/components/schemas/OembedPhotoData'
                                      link: '#/components/schemas/OembedLinkData'
                          frame: &id010
                            discriminator:
                              propertyName: version
                            oneOf:
                            - description: Frame v1 object
                              allOf:
                              - &id004
                                description: Frame base object used across all versions
                                type: object
                                required:
                                - version
                                - image
                                - frames_url
                                properties:
                                  version:
                                    type: string
                                    description: Version of the frame, 'next' for
                                      v2, 'vNext' for v1
                                  image:
                                    type: string
                                    description: URL of the image
                                  frames_url:
                                    type: string
                                    description: Launch URL of the frame
                              - type: object
                                properties:
                                  buttons:
                                    type: array
                                    items:
                                      type: object
                                      required:
                                      - index
                                      - action_type
                                      properties:
                                        title:
                                          type: string
                                          description: Title of the button
                                        index:
                                          type: integer
                                          description: Index of the button
                                        action_type:
                                          type: string
                                          description: The action type of a frame
                                            button. Action types "mint" & "link" are
                                            to be handled on the client side only
                                            and so they will produce a no/op for POST
                                            /farcaster/frame/action.
                                          enum:
                                          - post
                                          - post_redirect
                                          - tx
                                          - link
                                          - mint
                                        target:
                                          type: string
                                          description: Target of the button
                                        post_url:
                                          type: string
                                          description: Used specifically for the tx
                                            action type to post a successful transaction
                                            hash
                                  post_url:
                                    type: string
                                    description: Post URL to take an action on this
                                      frame
                                  title:
                                    type: string
                                  image_aspect_ratio:
                                    type: string
                                  input:
                                    type: object
                                    properties:
                                      text:
                                        type: string
                                        description: Input text for the frame
                                  state:
                                    type: object
                                    properties:
                                      serialized:
                                        type: string
                                        description: State for the frame in a serialized
                                          format
                            - description: Frame v2 object
                              allOf:
                              - *id004
                              - type: object
                                required:
                                - title
                                - name
                                - icon
                                properties:
                                  manifest:
                                    type: object
                                    properties:
                                      account_association:
                                        type: object
                                        properties:
                                          header:
                                            type: string
                                          payload:
                                            type: string
                                          signature:
                                            type: string
                                        required:
                                        - header
                                        - payload
                                        - signature
                                      frame:
                                        type: object
                                        properties:
                                          version:
                                            type: string
                                            enum:
                                            - 0.0.0
                                            - 0.0.

Action types
                        "mint" & "link" are to be handled on the client side only
                        and so they will produce a no/op for POST /farcaster/frame/action.
                      enum:
                      - post
                      - post_redirect
                      - tx
                      - link
                      - mint
                    target:
                      type: string
                      description: Target of the button
                    post_url:
                      type: string
                      description: Used specifically for the tx action type to post
                        a successful transaction hash
              post_url:
                type: string
                description: Post URL to take an action on this frame
              title:
                type: string
              image_aspect_ratio:
                type: string
              input:
                type: object
                properties:
                  text:
                    type: string
                    description: Input text for the frame
              state:
                type: object
                properties:
                  serialized:
                    type: string
                    description: State for the frame in a serialized format
        - description: Frame v2 object
          allOf:
          - *id002
          - type: object
            required:
            - title
            - name
            - icon
            properties:
              manifest:
                type: object
                properties:
                  account_association:
                    type: object
                    properties:
                      header:
                        type: string
                      payload:
                        type: string
                      signature:
                        type: string
                    required:
                    - header
                    - payload
                    - signature
                  frame:
                    type: object
                    properties:
                      version:
                        type: string
                        enum:
                        - 0.0.0
                        - 0.0.1
                        - '1'
                        - next
                      name:
                        type: string
                        maxLength: 32
                      home_url:
                        type: string
                        maxLength: 512
                      icon_url:
                        type: string
                        maxLength: 512
                      image_url:
                        type: string
                        maxLength: 512
                      button_title:
                        type: string
                        maxLength: 32
                      splash_image_url:
                        type: string
                        maxLength: 512
                      splash_background_color:
                        type: string
                      webhook_url:
                        type: string
                        maxLength: 512
                    required:
                    - version
                    - name
                    - home_url
                    - icon_url
                  triggers:
                    type: array
                    items:
                      oneOf:
                      - type: object
                        properties:
                          type:
                            type: string
                            enum:
                            - cast
                          id:
                            type: string
                          url:
                            type: string
                            maxLength: 512
                          name:
                            type: string
                            maxLength: 32
                        required:
                        - type
                        - id
                        - url
                      - type: object
                        properties:
                          type:
                            type: string
                            enum:
                            - composer
                          id:
                            type: string
                          url:
                            type: string
                            maxLength: 512
                          name:
                            type: string
                            maxLength: 32
                        required:
                        - type
                        - id
                        - url
                required:
                - account_association
              author:
                type: object
                required:
                - object
                - fid
                properties:
                  object:
                    type: string
                    enum:
                    - user_dehydrated
                  fid:
                    type: integer
                    format: int32
                    description: The unique identifier of a farcaster user (unsigned
                      integer)
                    examples:
                    - 3
                    - 191
                    - 2
                    - 194
                    - 19960
                  username:
                    type: string
                  display_name:
                    type: string
                  pfp_url:
                    type: string
        mapping:
          vNext: '#/components/schemas/FrameV1'
          next: '#/components/schemas/FrameV2'
          '1': '#/components/schemas/FrameV2'
          0.0.0: '#/components/schemas/FrameV2'
          0.0.1: '#/components/schemas/FrameV2'
```

Action types "mint"
                    & "link" are to be handled on the client side only and so they
                    will produce a no/op for POST /farcaster/frame/action.
                  enum:
                  - post
                  - post_redirect
                  - tx
                  - link
                  - mint
                target:
                  type: string
                  description: Target of the button
                post_url:
                  type: string
                  description: Used specifically for the tx action type to post a
                    successful transaction hash
          post_url:
            type: string
            description: Post URL to take an action on this frame
          title:
            type: string
          image_aspect_ratio:
            type: string
          input:
            type: object
            properties:
              text:
                type: string
                description: Input text for the frame
          state:
            type: object
            properties:
              serialized:
                type: string
                description: State for the frame in a serialized format
    - description: Frame v2 object
      allOf:
      - *id001
      - type: object
        required:
        - title
        - name
        - icon
        properties:
          manifest:
            type: object
            properties:
              account_association:
                type: object
                properties:
                  header:
                    type: string
                  payload:
                    type: string
                  signature:
                    type: string
                required:
                - header
                - payload
                - signature
              frame:
                type: object
                properties:
                  version:
                    type: string
                    enum:
                    - 0.0.0
                    - 0.0.1
                    - '1'
                    - next
                  name:
                    type: string
                    maxLength: 32
                  home_url:
                    type: string
                    maxLength: 512
                  icon_url:
                    type: string
                    maxLength: 512
                  image_url:
                    type: string
                    maxLength: 512
                  button_title:
                    type: string
                    maxLength: 32
                  splash_image_url:
                    type: string
                    maxLength: 512
                  splash_background_color:
                    type: string
                  webhook_url:
                    type: string
                    maxLength: 512
                required:
                - version
                - name
                - home_url
                - icon_url
              triggers:
                type: array
                items:
                  oneOf:
                  - type: object
                    properties:
                      type:
                        type: string
                        enum:
                        - cast
                      id:
                        type: string
                      url:
                        type: string
                        maxLength: 512
                      name:
                        type: string
                        maxLength: 32
                    required:
                    - type
                    - id
                    - url
                  - type: object
                    properties:
                      type:
                        type: string
                        enum:
                        - composer
                      id:
                        type: string
                      url:
                        type: string
                        maxLength: 512
                      name:
                        type: string
                        maxLength: 32
                    required:
                    - type
                    - id
                    - url
            required:
            - account_association
          author:
            type: object
            required:
            - object
            - fid
            properties:
              object:
                type: string
                enum:
                - user_dehydrated
              fid:
                type: integer
                format: int32
                description: The unique identifier of a farcaster user (unsigned integer)
                examples:
                - 3
                - 191
                - 2
                - 194
                - 19960
              username:
                type: string
              display_name:
                type: string
              pfp_url:
                type: string
    mapping:
      vNext: '#/components/schemas/FrameV1'
      next: '#/components/schemas/FrameV2'
      '1': '#/components/schemas/FrameV2'
      0.0.0: '#/components/schemas/FrameV2'
      0.0.1: '#/components/schemas/FrameV2'
```

# fetch-frame-catalog

**Endpoint**: `GET /farcaster/frame/catalog`

## Description
A curated list of featured frames

## Parameters
- `limit` (query): Number of results to fetch
- `cursor` (query): Pagination cursor

## Response
```yaml
type: object
required:
- frames
- next
properties:
  frames:
    type: array
    items:
      description: Frame v2 object
      allOf:
      - description: Frame base object used across all versions
        type: object
        required:
        - version
        - image
        - frames_url
        properties:
          version:
            type: string
            description: Version of the frame, 'next' for v2, 'vNext' for v1
          image:
            type: string
            description: URL of the image
          frames_url:
            type: string
            description: Launch URL of the frame
      - type: object
        required:
        - title
        - name
        - icon
        properties:
          manifest:
            type: object
            properties:
              account_association:
                type: object
                properties:
                  header:
                    type: string
                  payload:
                    type: string
                  signature:
                    type: string
                required:
                - header
                - payload
                - signature
              frame:
                type: object
                properties:
                  version:
                    type: string
                    enum:
                    - 0.0.0
                    - 0.0.1
                    - '1'
                    - next
                  name:
                    type: string
                    maxLength: 32
                  home_url:
                    type: string
                    maxLength: 512
                  icon_url:
                    type: string
                    maxLength: 512
                  image_url:
                    type: string
                    maxLength: 512
                  button_title:
                    type: string
                    maxLength: 32
                  splash_image_url:
                    type: string
                    maxLength: 512
                  splash_background_color:
                    type: string
                  webhook_url:
                    type: string
                    maxLength: 512
                required:
                - version
                - name
                - home_url
                - icon_url
              triggers:
                type: array
                items:
                  oneOf:
                  - type: object
                    properties:
                      type:
                        type: string
                        enum:
                        - cast
                      id:
                        type: string
                      url:
                        type: string
                        maxLength: 512
                      name:
                        type: string
                        maxLength: 32
                    required:
                    - type
                    - id
                    - url
                  - type: object
                    properties:
                      type:
                        type: string
                        enum:
                        - composer
                      id:
                        type: string
                      url:
                        type: string
                        maxLength: 512
                      name:
                        type: string
                        maxLength: 32
                    required:
                    - type
                    - id
                    - url
            required:
            - account_association
          author:
            type: object
            required:
            - object
            - fid
            properties:
              object:
                type: string
                enum:
                - user_dehydrated
              fid:
                type: integer
                format: int32
                description: The unique identifier of a farcaster user (unsigned integer)
                examples:
                - 3
                - 191
                - 2
                - 194
                - 19960
              username:
                type: string
              display_name:
                type: string
              pfp_url:
                type: string
  next:
    type: object
    description: Returns next cursor
    required:
    - cursor
    properties:
      cursor:
        type:
        - string
        - 'null'
```

User prompt:
I have this dune query that I want to show in a Farcaster frame. I want to show the list of top users and also I want it to take the users address from Farcaster context that we get from frame sdk and check where the logged-in user is on the list based on wallet address
 
https://dune.com/queries/4666478?emoticon_t6c1ea=%F0%9F%A5%9C


