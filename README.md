install ollama > pull model 
register tavily copy api key
```sh```
cp .env.example .env
``````
isi .env tavily apikey

testing 
```bash```
curl -X POST http://localhost:3000/api/ai/search \
  -H "Content-Type: application/json" \
  -d '{"question": "recomended the best Gado Gado in jl monginsidi sidoarjo?"}'

``````
result

```json```
{
  "question": "recomended the best Gado Gado in jl monginsidi sidoarjo?",
  "answer": "<think>\nAlright, I'm trying to figure out the best Gado-Gado in JL Monginsidi Sidoarjo based on these search results. First, I see that there are multiple sources mentioning Gado-Gado Monginsidi 54 and Bu Ninik. The URLs from Sources 1 to 8 point towards this restaurant, so it's probably a well-known spot.\n\nLooking at the scores from different sources, Source 4 and 5 both give the restaurant a perfect 100/100 rating with 77 user reviews. That's really high, suggesting it's highly recommended. Then there are Sources 1, 2, 3, 6 which all have ratings around 0.72 to 0.76, so they're positive but not as stellar as Source 4 and 5.\n\nThe content from Source 7 and 8 also talk about Bu Ninik being the go-to place for authentic Gado-Gado in Sidoarjo. But wait, Source 1 mentions \"GADO GADO MONGINSIDI 54 (BU NINIK)\" which suggests it's at No. 54 on Monginsidi Street, and that might be the same as Bu Ninik since both are located there.\n\nSo putting this together, even though some sources have slightly lower ratings, the fact that multiple sources give it a perfect score and mention it as the best option makes me think Gado-Gado Monginsidi 54 (Bu Ninik) is the top choice. It's also featured in prominent places like Tripadvisor and other local platforms, which adds credibility.\n</think>\n\nThe best Gado-Gado restaurant in JL Monginsidi Sidoarjo is **Gado-Gado Monginsidi 54 (Bu Ninik)**. This establishment receives a perfect rating of 100/100 with numerous positive reviews highlighting its authentic flavors and high-quality service. It's a well-regarded spot, frequently mentioned across various sources as the top choice for Gado-Gado in the area.\n\n**Final Answer:**\nThe best Gado-Gado restaurant in JL Monginsidi Sidoarjo is **Gado-Gado Monginsidi 54 (Bu Ninik)**, known for its authentic Indonesian cuisine and excellent service.",
  "sources": [
    "https://www.tripadvisor.in/Restaurant_Review-g3175994-d23874138-Reviews-Gado_Gado_Monginsidi_54_bu_Ninik-Sidoarjo_East_Java_Java.html",
    "https://www.tripadvisor.com/Restaurant_Review-g3175994-d23874138-Reviews-Gado_Gado_Monginsidi_54_bu_Ninik-Sidoarjo_East_Java_Java.html",
    "https://www.tripadvisor.com/Restaurant_Review-g3175994-d23874138-Reviews-Gado_Gado_Monginsidi_54_bu_Ninik-Sidoarjo_East_Java_Java.html",
    "https://id.sluurpy.com/sidoarjo/restaurant/8501147/gado-gado-monginsidi-54",
    "https://id.sluurpy.com/sidoarjo/restaurant/8501147/gado-gado-monginsidi-54",
    "https://www.tripadvisor.co/Restaurant_Review-g3175994-d23874138-Reviews-Gado_Gado_Monginsidi_54-Sidoarjo_East_Java_Java.html",
    "https://www.buninik.com/",
    "https://www.buninik.com/"
  ]
}
``````
