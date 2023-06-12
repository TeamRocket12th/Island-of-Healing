<script setup lang="ts">
const articleDetail = {
  title: '建立連結與跨越認知偏見',
  coverImgUrl: 'https://picsum.photos/904/412',
  content: `<h2>認知偏見類型</h2>
    <h3>1.先入為主偏見</h3>
    <p>
      人們往往根據第一印象或刻板印象來評價他人，而忽略後續的事實或經驗。這可能導致對他人形成不公平或不正確的評價。
    </p>
    <br />
    <h3>2.群體偏見</h3>
    <p>
      人們對於不同的群體或社群持有刻板印象，並在沒有真正了解他們的情況下，對他們產生偏見或歧視。這種偏見可能基於種族、性別、宗教、性取向等因素。
    </p>
    <br />
    <h3>3.認知錯誤</h3>
    <p>
      人們往往對新資訊或觀點表現出偏見，這種偏見可能是因為個人偏好、固有信念或經驗的影響。這使得人們難以接受或評估新的觀點，並可能導致認知失衡。
    </p>
    <br />
    <p>
      這些認知偏見在我們的思維和判斷中普遍存在，可能影響我們對他人的看法和互動。意識到這些偏見的存在，並努力對其進行反思和修正，有助於建立更開放、包容和公正的觀點。
    </p>
    <h2>打破認知偏見的方法</h2>
    <p>
      認知偏見是我們思考和判斷的常見陷阱。它們可以影響我們對他人的看法，限制我們的觀點和行為。然而，我們可以學習如何打破這些偏見，建立開放的心態和連結。
    </p>
    <p>
      首先，意識是關鍵。了解認知偏見的存在並認識到自己的偏見是很重要的。我們可以反問自己：「我是否根據刻板印象或先入為主的觀點評價他人？」當我們意識到自己的偏見時，我們可以開始主動挑戰這些想法。
    </p>
    <br />
    <p>
      第二步是主動尋求多元性和不同觀點。與各種不同背景和經歷的人互動，聆聽他們的故事和觀點。這樣做可以幫助我們擴大視野，瞭解不同的價值觀和信念。透過敞開心胸，我們可以超越刻板印象並建立更真實的連結。
    </p>
    <br />
    <p>
      第三個方法是自我反省和思考。當我們面臨新的資訊或觀點時，要問問自己：「這是否基於事實還是偏見？」評估自己的思維和情感反應，並檢視是否有偏見的跡象。這需要勇氣和自我誠實，但這是超越偏見的重要一步。
    </p>
    <br />
    <p>
      另一個方法是開放對話和尊重。與他人進行開放、尊重和包容的對話可以幫助我們建立連結和理解。這包括願意聆聽他人的觀點，分享自己的想法並尊重不同的意見。這種開放性的對話可以促進互相學習和成長。
    </p>
    <br />
    <p>
      最後，教育和學習也是重要的。瞭解並學習關於不同文化、價值觀和社會議題的知識，可以幫助我們更全面地看待世界。這包括閱讀、參加工作坊、與專業人士討論等等。透過不斷學習，我們能夠消除偏見。
    </p>`,
  writer: '作家姓名',
  aboutMe: '作家自介',
  createdTime: '2023-05-23 17:43',
  category: '個人成長',
  tags: ['日常練習', '自我察覺', '個人成長']
}
</script>
<template>
  <section class="col-span-9">
    <div class="mb-10 border border-[#CDCDCD] p-10">
      <div class="mb-5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 overflow-hidden rounded-full">
            <img src="https://picsum.photos/32" alt="writer" />
          </div>
          <div>
            <p class="text-xs">作家</p>
            <p class="text-sm font-medium">{{ articleDetail.writer }}</p>
          </div>
        </div>
        <div>
          <p class="text-gray-400">
            {{ articleDetail.createdTime }} 發表於 {{ articleDetail.category }}
          </p>
        </div>
      </div>
      <h2 class="mb-6 text-[32px] font-bold">{{ articleDetail.title }}</h2>
      <img src="https://picsum.photos/904/412" alt="cover" class="mb-6 block" />
      <div>
        <div class="mb-9" v-html="articleDetail.content"></div>
        <div class="flex items-center justify-between">
          <CategoryTag :tags="articleDetail.tags" />
          <ul class="flex gap-3">
            <li class="cursor-pointer">
              <Icon name="material-symbols:favorite-outline-rounded" size="20" />
            </li>
            <li class="cursor-pointer">
              <Icon name="material-symbols:bookmark-outline-rounded" size="20" />
            </li>
            <li class="cursor-pointer"><Icon name="mdi:share-variant-outline" size="20" /></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mb-6 flex items-center justify-between border border-[#CDCDCD] p-6">
      <div class="flex items-center gap-2">
        <div class="h-[60px] w-[60px] overflow-hidden rounded-full">
          <img src="https://picsum.photos/60" alt="writer" />
        </div>
        <div>
          <p>{{ articleDetail.writer }}</p>
          <p>{{ articleDetail.aboutMe }}</p>
        </div>
      </div>

      <button class="flex items-center rounded border px-3 py-1 text-[#9F9F9F]">
        <Icon name="ic:baseline-plus" size="20" />追蹤
      </button>
    </div>
  </section>
</template>

<style scoped></style>
