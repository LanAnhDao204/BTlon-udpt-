// syncBooksNeo4jFull.js
import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', process.env.NEO4J_PASSWORD || 'thang044')
);

const session = driver.session();

const sampleBooksFull = [
    {
        id: "123453249",
        name: "Sách hoạt hình",
        lang: "Vietnamese",
        category: "Science",
        image: "https://i1-giaitri.vnecdn.net/2025/01/06/De-Me-n-phie-u-lu-u-ky-1736177-4191-9546-1736178205.jpg",
        title: "Sách khoa học",
        link: "",
        content: "Nội dung chi tiết sách...",
        description: "Giới thiệu ngắn gọn về sách"
    },
    {
        id: "1234523121234523126789",
        name: "Sách hihii",
        lang: "Vietnamese",
        category: "Science",
        image: "https://link.jpg",
        title: "Sách khoa học thú vị",
        link: "",
        content: "Nội dung chi tiết sách...",
        description: "Giới thiệu ngắn gọn về sách"
    },
    {
        id: "17473851585171812",
        name: "Dế Mèn Phiêu Lưu Ký",
        lang: "Vietnamese",
        category: "Fiction",
        image: "https://i1-giaitri.vnecdn.net/2025/01/06/De-Me-n-phie-u-lu-u-ky-1736177-4191-9546-1736178205.jpg",
        title: "Tác phẩm kinh điển của Tô Hoài kể về cuộc phiêu lưu của chú Dế Mèn",
        link: "",
        content: "Dế Mèn Phiêu Lưu Ký là tác phẩm văn học thiếu nhi nổi tiếng của nhà văn Tô Hoài kể về cuộc phiêu lưu của chú Dế Mèn. Cuộc hành trình bắt đầu từ lòng kiêu ngạo, gây họa cho Dế Choắt, và kết thúc bằng những bài học về tình bạn và lòng dũng cảm.",
        description: "Tác phẩm văn học thiếu nhi kinh điển của Việt Nam"
    },
    {
        id: "17473851585323404",
        name: "Truyện Kiều",
        lang: "Vietnamese",
        category: "literary",
        image: "https://cdn1.fahasa.com/media/flashmagazine/images/page_images/truyen_kieu/2021_09_08_08_30_55_1-390x510.jpg",
        title: "Tác phẩm thơ lục bát kinh điển của đại thi hào Nguyễn Du",
        link: "",
        content: "Trăm năm trong cõi người ta,\nChữ tài chữ mệnh khéo là ghét nhau.\nTrải qua một cuộc bể dâu,\nNhững điều trông thấy mà đau đớn lòng.",
        description: "Kiệt tác thơ lục bát Việt Nam"
    },
    {
        id: "17473851585112",
        name: "Tắt Đèn",
        lang: "Vietnamese",
        category: "literary",
        image: "https://cdn1.fahasa.com/media/flashmagazine/images/page_images/tat_den_tai_ban_2022/2022_06_27_11_52_02_1-390x510.jpg",
        title: "Tắt Đèn (Tái Bản) là một trong những tác phẩm văn học tiêu biểu nhất của nhà văn Ngô Tất Tố (tiểu thuyết, in trên báo Việt nữ năm 1937).",
        link: "",
        content: "Trăm năm trong cõi người ta,\nChữ tài chữ mệnh khéo là ghét nhau.\nTrải qua một cuộc bể dâu,\nNhững điều trông thấy mà đau đớn lòng.",
        description: "Kiệt tác thơ lục bát Việt Nam"
    },
    {
        id: "17473851585378994",
        name: "Nhà Giả Kim",
        lang: "Vietnamese",
        category: "Novel",
        image: "https://phatphapungdung.com/sach-noi/wp-content/uploads/2019/10/Nha-gia-kim.jpg",
        title: "Cuốn tiểu thuyết triết lý của Paulo Coelho về hành trình tìm kiếm vận mệnh",
        link: "",
        content: "Chàng chăn cừu Santiago từ Tây Ban Nha bắt đầu hành trình theo đuổi giấc mơ tìm kho báu và khám phá ra vận mệnh của chính mình. Anh học được Ngôn ngữ của Vũ trụ và sự khôn ngoan từ Nhà Giả Kim.",
        description: "Tiểu thuyết về hành trình tìm kiếm vận mệnh cá nhân"
    },
    {
        id: "17473851585425345",
        name: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
        lang: "Vietnamese",
        category: "Novel",
        image: "https://isach.info/images/story/cover/toi_thay_hoa_vang_tren_co_xanh__nguyen_nhat_anh.jpg",
        title: "Tiểu thuyết của Nguyễn Nhật Ánh về tuổi thơ miền quê",
        link: "",
        content: "Tác phẩm kể về tuổi thơ yên bình, trong sáng và đầy cảm xúc của hai anh em ở một làng quê miền Trung. Những mâu thuẫn, ghen tị, yêu thương đều hòa quyện trong bối cảnh làng quê đầy chất thơ.",
        description: "Tiểu thuyết về tuổi thơ miền quê Việt Nam"
    },
    {
        id: "17473851585551421",
        name: "Mã Mẫu Tử",
        lang: "Vietnamese",
        category: "Science",
        image: "https://bizweb.dktcdn.net/100/363/455/products/mamautu01e1696476247984.jpg?v=1710306252110",
        title: "Tác phẩm khoa học phổ thông của Lê Minh Đức",
        link: "",
        content: "Tác phẩm giải thích những khái niệm vật lý và vũ trụ học như Big Bang, lỗ đen, không-thời gian, thuyết tương đối và thuyết lượng tử bằng ngôn ngữ phổ thông cho mọi người cùng tiếp cận.",
        description: "Sách khoa học phổ thông về vũ trụ và thời gian"
    },
    {
        "id": "123456789",
        "name": "Thế Giới Atlantis",
        "lang": "Vietnamese",
        "category": "Science",
        "image": "https://sachtiengviet.com/cdn/shop/products/456a739f8ba25abcc0df9f7948ea67c5.jpg?v=1701972138",
        "title": "Sách khoa học viễn tưởng cực hay",
        "link": "",
        "content": "Nội dung chi tiết sách...",
        "description": "Giới thiệu ngắn gọn về sách"
    },
    {
        "id": "123421945",
        "name": "Người Truyền Ký Ức",
        "lang": "Vietnamese",
        "category": "Science",
        "image": "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.media/nguoi-truyen-ky-uc.jpg",
        "title": "Những lời đề tựa giới thiệu ở cuốn sách cũng không thể nào giúp chúng ta cảm nhận được hết trí tưởng tượng và thông điệp của nó. ",
        "link": "",
        "content": "Nội dung chi tiết sách...",
        "description": "Giới thiệu ngắn gọn về sách"
    }
    // ... bạn có thể thêm sách tiếp nếu muốn
];

async function readBooksFromNeo4j() {
    try {
        const result = await session.run('MATCH (b:Book) RETURN b');
        const books = result.records.map(record => record.get('b').properties);
        console.log('Exported books from Neo4j:', books);
        return books;
    } catch (error) {
        console.error('Error reading books:', error);
        return [];
    }
}

async function seedBooksToNeo4j(books) {
    try {
        // Xóa hết sách cũ
        await session.run('MATCH (b:Book) DETACH DELETE b');
        console.log('Deleted all existing books');

        // Thêm sách mới
        for (const book of books) {
            await session.run(
                `CREATE (b:Book {
          id: $id,
          name: $name,
          lang: $lang,
          category: $category,
          image: $image,
          title: $title,
          link: $link,
          content: $content,
          description: $description
        })`,
                book
            );
            console.log(`Created book ${book.name}`);
        }

        console.log('Seeded books successfully to Neo4j');
    } catch (error) {
        console.error('Error seeding books:', error);
    }
}

async function main() {
    try {
        // Đọc sách hiện tại từ Neo4j
        const currentBooks = await readBooksFromNeo4j();

        // Tích hợp dữ liệu hiện tại với dữ liệu mẫu đầy đủ (nếu muốn)
        // Ví dụ: bạn có thể gộp hoặc thay thế hoàn toàn bằng sampleBooksFull

        // Ở đây mình thay thế hoàn toàn bằng sampleBooksFull (để update dữ liệu)
        const updatedBooks = sampleBooksFull;

        // Ghi dữ liệu mới (updatedBooks) vào Neo4j
        await seedBooksToNeo4j(updatedBooks);
    } catch (error) {
        console.error('Error in main:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

main();
