<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/05 21:27:55
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <div>
    <p>
      文档：
      <a c-blue hover-decoration-underline href="https://uno.antfu.me/" target="_blank">
        https://uno.antfu.me/
      </a>
    </p>
    <p>
      playground：
      <a c-blue hover-decoration-underline href="https://unocss.antfu.me/play/" target="_blank">
        https://unocss.antfu.me/play/
      </a>
    </p>

    <div mt-20px w-350px flex-center flex-col>
      <div flex flex-wrap justify-around rounded-10 p-10pxpx card-border>
        <div m-20px h-50px w-50px flex-center rounded-5 p-10px border="1 solid">
          <span h-6px w-6px rounded-3px bg-black dark:bg-white />
        </div>
        <div m-20px h-50px w-50px flex justify-between rounded-5 p-10px border="1 solid">
          <span h-6px w-6px rounded-3px bg-black dark:bg-white />
          <span h-6px w-6px self-end rounded-3px bg-black dark:bg-white />
        </div>
        <div m-20px h-50px w-50px flex justify-between rounded-5 p-10px border="1 solid">
          <span h-6px w-6px rounded-3px bg-black dark:bg-white />
          <span h-6px w-6px self-center rounded-3px bg-black dark:bg-white />
          <span h-6px w-6px self-end rounded-3px bg-black dark:bg-white />
        </div>
        <div m-20px h-50px w-50px flex justify-between rounded-5 p-10px border="1 solid">
          <div flex-col justify-between>
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
          </div>
          <div flex-col justify-between>
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
          </div>
        </div>
        <div
          m-20px
          h-50px
          w-50px
          flex-col
          items-center
          justify-between
          rounded-5
          p-10px
          border="1 solid"
        >
          <div w-full flex justify-between>
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
          </div>
          <div h-6px w-6px rounded-3px bg-black dark:bg-white />
          <div w-full flex justify-between>
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
          </div>
        </div>
        <div m-20px h-50px w-50px flex-col justify-between rounded-5 p-10px border="1 solid">
          <div w-full flex justify-between>
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
          </div>
          <div w-full flex justify-between>
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
          </div>
          <div w-full flex justify-between>
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
            <span h-6px w-6px rounded-3px bg-black dark:bg-white />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
