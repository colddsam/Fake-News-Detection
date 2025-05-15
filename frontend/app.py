# streamlit_app/app.py
import streamlit as st
import requests
import json

API_BASE = "http://localhost:8000"  # 🔁 Update if deployed

headers = {
  'Content-Type': 'application/json'
}

st.set_page_config(page_title="Fake News Detector", layout="centered")

st.title("🕵️‍♂️ Fake News Detection App (Text + Image)")
st.markdown("Check if a news article or viral image is real using generative AI + live news.")

tab1, tab2 = st.tabs(["📝 Text-Based Check", "🖼 Image-Based Check"])

# ---------------------- TEXT-BASED CHECK ---------------------- #
with tab1:
    st.subheader("🔍 Verify a News Claim (Text)")
    text = st.text_area("Enter the news claim:", height=150)

    if st.button("Verify Text Claim"):
        if not text.strip():
            st.warning("Please enter a news claim.")
        else:
            with st.spinner("Verifying with AI..."):
                payload = json.dumps({
                    "content": text
                })
                res=requests.request("POST", f"{API_BASE}/verify_text_news", headers=headers, data=payload)

                # res = requests.post(f"{API_BASE}/verify_text_news", json={"content": text})
                data = res.json()

            st.success(f"🧠 Verdict: **{data.get('verdict')}**")
            st.progress(int(data.get("truth_score", 0)))

            st.markdown(f"**Reason:** {data.get('reason')}")
            links = data.get("evidence_links", [])
            if links:
                st.markdown("**Evidence Links:**")
                for link in links:
                    st.markdown(f"- [🔗 Source]({link})")

# ---------------------- IMAGE-BASED CHECK ---------------------- #
with tab2:
    st.subheader("🖼 Upload Image + Claim")
    uploaded_file = st.file_uploader("Upload an image (JPG/PNG)", type=["jpg", "jpeg", "png"])
    claim_text = st.text_input("Optional claim/description of the image")

    if st.button("Verify Image"):
        if not uploaded_file:
            st.warning("Please upload an image.")
        else:
            with st.spinner("Analyzing image + news sources..."):
                files = {"file": uploaded_file.getvalue()}
                data = {"claim": claim_text}
                payload = {'query': claim_text}
                
                res = requests.post(f"{API_BASE}/verify_image_news", files={"file": uploaded_file}, data=data)
                data = res.json()

            st.success(f"🧠 Verdict: **{data.get('verdict')}**")
            st.progress(int(data.get("truth_score", 0)))
            st.markdown(f"**Reason:** {data.get('reason')}")

            links = data.get("evidence_links", [])
            if links:
                st.markdown("**Evidence Links:**")
                for link in links:
                    st.markdown(f"- [🔗 Source]({link})")
