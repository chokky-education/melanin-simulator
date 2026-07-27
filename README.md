# UV & Melanin Educational Simulator

เว็บแอปสื่อการเรียนรู้ภาษาไทยที่ช่วยให้นักศึกษาเข้าใจว่า UVA และ UVB ส่งผลต่อผิวแต่ละชั้นอย่างไร รวมถึงบทบาทของเมลานิน ระยะเวลาที่โดนแดด และพฤติกรรมการป้องกันแสงแดด

## 🎯 กลุ่มผู้ใช้งาน

นักศึกษามหาวิทยาลัยด้านความงาม สุนทรียศาสตร์ เครื่องสำอาง และสาขาที่เกี่ยวข้อง

## ✨ ฟีเจอร์

- **UV Control Panel**: ปรับระดับ UV, ระยะเวลา, ประเภทรังสี (UVA/UVB/ผสม), และระดับเมลานินพื้นฐาน (Fitzpatrick Scale I-VI)
- **Behavior Selector**: เลือกพฤติกรรมป้องกัน เช่น ใช้กันแดด, สวมเสื้อผ้าป้องกัน, หลีกเลี่ยงแดดจัด
- **Skin Layer Visualization**: ภาพจำลอง SVG แสดงผิว 3 ชั้น (Epidermis, Dermis, Subcutaneous) และรังสี UV
- **Result Display**: แสดงผลลัพธ์เชิงคุณภาพ (ต่ำ/ปานกลาง/สูง/สูงมาก) พร้อมคำแนะนำ
- **Responsive Design**: ใช้งานได้ทั้ง desktop และ mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages (Static Export)

## 🚀 การติดตั้งและการพัฒนา

### ข้อกำหนด

- Node.js 20.9 หรือสูงกว่า

### ติดตั้ง dependencies

```bash
npm install
```

### รัน development server

```bash
npm run dev
```

เปิด http://localhost:3000 ในเบราว์เซอร์

### Build สำหรับ production

```bash
npm run build
```

ไฟล์ static จะถูกสร้างในโฟลเดอร์ `out/`

### Deploy to GitHub Pages

โปรเจกต์นี้มี GitHub Actions workflow สำหรับ deploy ไปยัง GitHub Pages อัตโนมัติเมื่อ push ไปยัง branch `main`

## ⚠️ ข้อควรระวัง

**แบบจำลองนี้สร้างขึ้นเพื่อการศึกษาเท่านั้น**

- ไม่ใช่เครื่องมือวิเคราะห์ผิว
- ไม่ใช่การวินิจฉัยโรค
- ไม่ใช่คำแนะนำทางการแพทย์
- ผลลัพธ์เป็นแนวโน้มเชิงคุณภาพ ไม่ใช่ค่าที่แม่นยำทางคลินิก
- เมลานินถูกใช้เป็นตัวแปรเพื่ออธิบายแนวคิดเท่านั้น ไม่ใช้ระบุเชื้อชาติ
- ทุกสีผิวยังคงได้รับผลกระทบจากรังสี UV ได้

## 📚 แหล่งข้อมูลอ้างอิง

- [Fitzpatrick Scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale)
- [UV Index](https://www.who.int/news-room/questions-and-answers/item/radiation-ultraviolet-(uv)-and-the-uv-index)
- [Skin Anatomy](https://www.skincancer.org/skin-cancer-information/skin-cancer-facts)

## 📄 License

MIT License - พัฒนาเพื่อการศึกษา

## 🤝 Contribution

โปรเจกต์นี้เปิดรับ contribution เพื่อการพัฒนาสื่อการเรียนรู้ หากพบปัญหาหรือมีข้อเสนอแนะ สามารถเปิด Issue หรือ Pull Request ได้เลย
