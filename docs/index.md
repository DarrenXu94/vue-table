<!-- ---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vue Table Accessible"
  tagline: A Dynamic and Accessible Vue Table Component for Every Project.
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples


--- -->

# Vue Table Accessible

A Dynamic and Accessible Vue Table Component for Every Project.

## What is the problem we are trying to solve?

Trying using your keyboard to navigate to the next page

<script setup>
import BasicNoRoving from '../src/examples/BasicNoRoving.vue'
import BasicRoving from '../src/examples/BasicRoving.vue'
</script>

<BasicNoRoving />

You had to press tab 15 times to get here.


Now do it again on a more advanced table

<BasicNoRoving advanced />

How many times did you have to tab to get here?

How do we solve this?

## Solution: Roving tabindex

Tab once to focus in, then you will be able to navigate with arrow keys. Tab again to escape to the end of the table.

<BasicRoving advanced />