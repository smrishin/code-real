<script setup>
import StartMockButton from "@components/header/StartMockButton.vue";
import Settings from "@components/settings/Settings.vue";
import SettingsButton from "@components/settings/SettingsButton.vue";
</script>

<template>
  <div
    class="max-w-none flex flex-col gap-10 px-6 py-8 md:px-12 md:py-14 mx-4 my-6 md:mx-8 bg-[#272727] border-2 border-[#373737] rounded-lg"
  >
    <div class="flex flex-col gap-4 text-gray-400">
      <h2 class="text-2xl font-bold text-blue-600 text-center">What is it?</h2>
      <p class="text-md">
        This is a mock coding interview tool, built by a developer who got tired
        of solving algorithm problems that felt more like math puzzles than
        actual interviews.
      </p>
      <p class="text-md">
        It takes popular coding questions and reframes them in a way the top
        tech companies like Amazon, Google, Meta might present them, in
        realistic, interview-style scenarios.
      </p>
    </div>

    <div class="flex flex-col gap-4 text-gray-400">
      <h2 class="text-2xl font-bold text-amber-500 text-center">
        How it works
      </h2>
      <ul class="list-disc list-inside text-md">
        <li>
          Hit Start Mock — you get a company-style question and the timer starts
          immediately.
        </li>
        <li>You can pause the timer if you don't want a timed session.</li>
        <li>
          Once the timer hits 0, your code gets locked. No more edits — just
          like a real interview.
        </li>
        <li>
          Click Run — your solution is copied, and you can paste it directly
          into LeetCode to test.
        </li>
      </ul>
    </div>

    <div class="flex justify-center items-center gap-6">
      <StartMockButton />
      <SettingsButton toopTipPlacement="right" />
    </div>
  </div>

  <div
    id="settings"
    class="max-w-none flex flex-col gap-10 px-6 py-8 mx-4 my-6 md:mx-8 bg-[#272727] border-2 border-[#373737] rounded-lg"
  >
    <h2 class="text-xl font-semibold text-gray-100">Settings</h2>
    <Settings
      field-class="border border-[#474747] bg-[#303030]  focus:outline-none focus:ring-2 focus:ring-[#474747] text-gray-100"
    />
    <!-- <div class="prose max-w-none flex flex-col gap-10 px-10 py-6">
      <div class="flex flex-col gap-2 text-gray-400">
        <h2 class="text-2xl font-bold text-gray-200">Fully customizable</h2>
        <p class="text-md">Before you start, you can tweak:</p>
        <ul class="list-disc list-inside">
          <li>Company (Amazon, Google, Meta, etc.)</li>
          <li>Difficulty level</li>
          <li>Number of questions</li>
          <li>Timer settings</li>
          <li>Topics</li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
p {
  line-height: 1.75em;
}

li {
  line-height: 1.5em;
}

li::after {
  content: "";
  display: block;
  height: 0.5em;
}
</style>
